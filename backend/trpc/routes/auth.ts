import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { sns } from "../../lib/sns";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { PublishCommand } from "@aws-sdk/client-sns";
import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { TABLE_NAMES } from "../../config";
import { sign } from "hono/jwt";

// Use a secure secret in production from environment variables!
const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret-rork-2026";

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION || "ap-south-1" });
const CLIENT_ID = "qi8njk53r44pfkfirmiid8681"; // User App / Vendor App Cognito Client ID

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(6),
            phoneNumber: z.string(),
            role: z.enum(['client', 'vendor'])
        }))
        .mutation(async ({ input }) => {
            const { email, password, phoneNumber, role } = input;
            
            const tableName = role === 'client' ? TABLE_NAMES.USER_PROFILE : TABLE_NAMES.VENDOR;
            const prefix = role === 'client' ? 'User' : 'Vendor';
            const userId = email.toLowerCase();

            // 1. Create User in AWS Cognito
            try {
                await cognitoClient.send(new SignUpCommand({
                    ClientId: CLIENT_ID,
                    Username: email.toLowerCase(),
                    Password: password,
                    UserAttributes: [
                        { Name: "email", Value: email.toLowerCase() },
                        { Name: "phone_number", Value: phoneNumber }
                    ]
                }));
            } catch (error: any) {
                if (error.name === 'UsernameExistsException') {
                    throw new Error("User with this email already exists.");
                }
                throw new Error(error.message || "Registration failed in Cognito");
            }

            // 2. Create Profile in DynamoDB
            const userRecord = {
                id: userId,
                email: email.toLowerCase(),
                phoneNumber,
                role,
                createdAt: new Date().toISOString(),
                __typename: prefix,
            };

            await db.send(
                new PutCommand({
                    TableName: tableName,
                    Item: userRecord,
                })
            );

            // 3. Generate Local JWT
            const payload = {
                id: userId,
                role: userRecord.role,
                email: userRecord.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            };

            const token = await sign(payload, JWT_SECRET);

            return {
                success: true,
                token,
                user: {
                    id: userId,
                    role: userRecord.role,
                    email: userRecord.email,
                    phoneNumber: userRecord.phoneNumber
                }
            };
        }),

    login: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string(),
            role: z.enum(['client', 'vendor'])
        }))
        .mutation(async ({ input }) => {
            const { email, password, role } = input;
            const userId = email.toLowerCase();

            // 1. Authenticate with AWS Cognito
            try {
                await cognitoClient.send(new InitiateAuthCommand({
                    AuthFlow: "USER_PASSWORD_AUTH",
                    ClientId: CLIENT_ID,
                    AuthParameters: {
                        USERNAME: email.toLowerCase(),
                        PASSWORD: password,
                    }
                }));
            } catch (error: any) {
                if (error.name === 'NotAuthorizedException' || error.name === 'UserNotFoundException') {
                    throw new Error("Invalid email or password");
                }
                throw new Error(error.message || "Authentication failed");
            }

            // 2. Retrieve/Create DynamoDB Profile
            const tableName = role === 'client' ? TABLE_NAMES.USER_PROFILE : TABLE_NAMES.VENDOR;
            const prefix = role === 'client' ? 'User' : 'Vendor';
            
            const result = await db.send(
                new GetCommand({
                    TableName: tableName,
                    Key: { id: userId },
                })
            );

            let userRecord = result.Item;

            if (!userRecord) {
                // User exists in Cognito but profile might be missing in DynamoDB for this role
                userRecord = {
                    id: userId,
                    email: email.toLowerCase(),
                    role,
                    createdAt: new Date().toISOString(),
                    __typename: prefix,
                };
                await db.send(
                    new PutCommand({
                        TableName: tableName,
                        Item: userRecord,
                    })
                );
            }

            // 3. Generate Local JWT
            const payload = {
                id: userId,
                role: userRecord.role,
                email: userRecord.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            };

            const token = await sign(payload, JWT_SECRET);

            return {
                success: true,
                token,
                user: {
                    id: userId,
                    role: userRecord.role,
                    email: userRecord.email,
                    phoneNumber: userRecord.phoneNumber
                }
            };
        }),

    sendOTP: publicProcedure
        .input(z.object({ phoneNumber: z.string(), role: z.enum(['client', 'vendor']) }))
        .mutation(async ({ input }) => {
            const { phoneNumber, role } = input;
            // Generate 6-digit OTP
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

            // Store in DynamoDB (UserProfile table as temp storage for now)
            const otpId = `OTP#${phoneNumber}`;

            await db.send(
                new PutCommand({
                    TableName: TABLE_NAMES.USER_PROFILE,
                    Item: {
                        id: otpId,
                        phoneNumber,
                        code,
                        role,
                        expiresAt,
                        __typename: "OTPAnalysis",
                    },
                })
            );

            // Send via SNS
            try {
                await sns.send(
                    new PublishCommand({
                        PhoneNumber: phoneNumber,
                        Message: `Your verification code for ad.agen is: ${code}`,
                        MessageAttributes: {
                            'AWS.SNS.SMS.SMSType': {
                                DataType: 'String',
                                StringValue: 'Transactional',
                            },
                        },
                    })
                );
                return { success: true, message: "OTP sent successfully" };
            } catch (error) {
                console.error("SNS Error:", error);
                throw new Error("Failed to send OTP message. Please check the number and try again.");
            }
        }),

    verifyOTP: publicProcedure
        .input(z.object({ phoneNumber: z.string(), code: z.string(), role: z.enum(['client', 'vendor']) }))
        .mutation(async ({ input }) => {
            const { phoneNumber, code, role } = input;
            const otpId = `OTP#${phoneNumber}`;

            const result = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.USER_PROFILE,
                    Key: { id: otpId },
                })
            );

            const record = result.Item;

            if (!record) {
                throw new Error("OTP not found or expired");
            }

            if (record.code !== code) {
                throw new Error("Invalid OTP");
            }

            if (Date.now() > record.expiresAt) {
                throw new Error("OTP expired");
            }

            // OTP Verified. Find or create the actual User record
            const userId = `User#${phoneNumber}`;
            const userResult = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.USER_PROFILE,
                    Key: { id: userId },
                })
            );

            let userRecord = userResult.Item;

            if (!userRecord) {
                // Create new user
                userRecord = {
                    id: userId,
                    phoneNumber,
                    role,
                    createdAt: Date.now(),
                    __typename: "User",
                };
                await db.send(
                    new PutCommand({
                        TableName: TABLE_NAMES.USER_PROFILE,
                        Item: userRecord,
                    })
                );
            }

            // Generate JWT
            const payload = {
                id: userId,
                role: userRecord.role,
                phoneNumber: userRecord.phoneNumber,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            };

            const token = await sign(payload, JWT_SECRET);

            return {
                success: true,
                token,
                user: {
                    id: userId,
                    role: userRecord.role,
                    phoneNumber: userRecord.phoneNumber
                }
            };
        }),
});
