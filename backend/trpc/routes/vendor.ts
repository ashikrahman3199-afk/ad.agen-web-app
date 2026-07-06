import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAMES } from "../../config";

export const vendorRouter = createTRPCRouter({
    getProfile: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .query(async ({ input }) => {
            const { email } = input;
            const userId = email.toLowerCase();

            const result = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.VENDOR,
                    Key: { id: userId },
                })
            );

            return result.Item || null;
        }),

    updateProfile: publicProcedure
        .input(z.object({
            email: z.string().email(),
            companyName: z.string().optional(),
            gstNumber: z.string().optional(),
            contactPerson: z.string().optional(),
            phone: z.string().optional(),
            address: z.string().optional(),
            bankName: z.string().optional(),
            accountHolderName: z.string().optional(),
            accountNumber: z.string().optional(),
            ifscCode: z.string().optional(),
            branchName: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
            const { email, ...updateFields } = input;
            const userId = email.toLowerCase();

            const result = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.VENDOR,
                    Key: { id: userId },
                })
            );

            let userRecord = result.Item;

            if (!userRecord) {
                userRecord = {
                    id: userId,
                    email: userId,
                    role: 'vendor',
                    createdAt: new Date().toISOString(),
                    __typename: 'Vendor',
                };
            }

            const updatedRecord = {
                ...userRecord,
                ...updateFields,
            };

            await db.send(
                new PutCommand({
                    TableName: TABLE_NAMES.VENDOR,
                    Item: updatedRecord,
                })
            );

            return { success: true, profile: updatedRecord };
        }),
});
