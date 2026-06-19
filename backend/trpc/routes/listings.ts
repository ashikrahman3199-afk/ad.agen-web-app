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
                status: z.enum(["Active", "Inactive", "Pending"]).default("Pending"),
                imageUrl: z.string().optional(),
                slots: z.number().optional().default(1),
            })
        )
        .mutation(async ({ input }) => {
            const id = Date.now().toString(); // Simple ID generation
            const createdAt = new Date().toISOString();
            const vendorId = "ashikrahman3199@gmail.com"; // Let's use the actual vendor email

            const item = {
                id,
                title: input.name,
                category: input.categoryId,
                location: input.location,
                price: input.price,
                priceUnit: "Monthly",
                rating: 0,
                image: input.imageUrl || "",
                description: input.description,
                reach: "TBD",
                minSpend: input.price,
                features: [],
                approvalStatus: input.status === "Pending" ? "PENDING" : input.status.toUpperCase(),
                vendorId: vendorId,
                owner: vendorId,
                createdAt,
                updatedAt: createdAt,
                __typename: "AdSpace", // Often used by Amplify/AppSync
                _version: 1,
                _lastChangedAt: Date.now(),
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
        // Only return services that are approved
        return (result.Items || [])
            .filter(item => item.approvalStatus === "APPROVED" || item.status === "Active")
            .map(item => ({
                ...item,
                name: item.title || item.name, // Ensure compatibility with frontend expecting 'name'
            }));
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
            return result.Item ? { ...result.Item, name: result.Item.title || result.Item.name } : null;
        }),
});
