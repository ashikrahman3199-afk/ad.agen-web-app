import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAMES } from "../../config";

export const listingsRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                categoryId: z.string(),
                price: z.number(), // Changed to number to match likely DB schema
                location: z.string(),
                description: z.string(),
                status: z.enum(["Active", "Inactive", "Pending"]).default("Active"),
                imageUrl: z.string().optional(),
                slots: z.number().optional().default(1),
            })
        )
        .mutation(async ({ input }) => {
            const id = Date.now().toString(); // Simple ID generation
            const createdAt = new Date().toISOString();
            const vendorId = "mock-vendor-id"; // Placeholder until auth is ready

            const item = {
                id,
                vendorId,
                ...input,
                createdAt,
                updatedAt: createdAt,
                __typename: "Service", // Often used by Amplify/AppSync
            };

            await db.send(
                new PutCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Item: item,
                })
            );

            return item;
        }),

    list: publicProcedure.query(async () => {
        const result = await db.send(
            new ScanCommand({
                TableName: TABLE_NAMES.SERVICE,
            })
        );
        return result.Items || [];
    }),

    get: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const result = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Key: { id: input.id },
                })
            );
            return result.Item || null;
        }),
});
