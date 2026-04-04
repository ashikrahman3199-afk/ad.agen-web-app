import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { sns } from "../../lib/sns";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { PublishCommand } from "@aws-sdk/client-sns";
import { TABLE_NAMES } from "../../config";
import { sign } from "hono/jwt";

// Use a secure secret in production from environment variables!
const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret-rork-2026";

export const authRouter = createTRPCRouter({
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
                        Message: `Your verification code for Rork is: ${code}`,
                        MessageAttributes: {
                            'AWS.SNS.SMS.SMSType': {
                                DataType: 'String',
                                StringValue: 'Transactional',
                            },
                        },
                    })
                );
                return { success: true, message: "OTP Sent" };
            } catch (error) {
                console.error("SNS Error:", error);
                throw new Error("Failed to send verification code. Please try again later.");
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
