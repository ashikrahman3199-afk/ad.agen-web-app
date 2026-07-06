import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { PutCommand, ScanCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAMES } from "../../config";

export const listingsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                categoryId: z.string(),
                price: z.number(), // Changed to number to match likely DB schema
                location: z.string(),
                description: z.string(),
                status: z.enum(["Active", "Inactive", "Pending"]).default("Pending"),
                imageUrl: z.string().optional(),
                images: z.array(z.string()).optional(),
                minDuration: z.number().default(1),
                durationUnit: z.enum(["Days", "Weeks", "Months"]).default("Days"),
                slots: z.number().optional().default(1),
                metadata: z.record(z.any()).optional().default({}),
                subServices: z.array(z.string()).optional().default([]),
                blockedDates: z.array(z.string()).optional().default([]),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const id = Date.now().toString(); // Simple ID generation
            const createdAt = new Date().toISOString();
            const vendorId = ctx.user.id; // Use actual authenticated vendor

            const item = {
                id,
                title: input.name,
                category: input.categoryId,
                location: input.location,
                price: input.price,
                priceUnit: input.durationUnit || "Weeks",
                rating: 0,
                image: input.imageUrl || (input.images && input.images.length > 0 ? input.images[0] : ""),
                images: input.images || [],
                minDuration: input.minDuration || 1,
                description: input.description,
                reach: "TBD",
                minSpend: input.price,
                features: [],
                approvalStatus: "PENDING", // Force pending for admin approval
                status: "Pending", // Set visibility status to pending
                vendorId: vendorId,
                owner: vendorId,
                metadata: input.metadata,
                subServices: input.subServices,
                blockedDates: input.blockedDates,
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
        // Only return services that are approved by admin
        return (result.Items || [])
            .filter(item => item.approvalStatus === "APPROVED")
            .map(item => ({
                ...item,
                name: item.title || item.name, // Ensure compatibility with frontend expecting 'name'
            }));
    }),

    myListings: protectedProcedure.query(async ({ ctx }) => {
        const vendorId = ctx.user.id;
        const result = await db.send(
            new ScanCommand({
                TableName: TABLE_NAMES.SERVICE,
            })
        );
        // In a real app with GSI, use QueryCommand. For now, filter in memory.
        return (result.Items || [])
            .filter(item => item.vendorId === vendorId || item.owner === vendorId)
            .map(item => ({
                ...item,
                name: item.title || item.name,
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

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const vendorId = ctx.user.id;
            
            const getResult = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Key: { id: input.id },
                })
            );

            const item = getResult.Item;
            if (!item || (item.vendorId !== vendorId && item.owner !== vendorId)) {
                throw new Error("Unauthorized to delete this listing");
            }

            await db.send(
                new DeleteCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Key: { id: input.id },
                })
            );
            
            return { success: true };
        }),

    updateStatus: protectedProcedure
        .input(z.object({ id: z.string(), status: z.enum(["Active", "Inactive", "Pending"]) }))
        .mutation(async ({ input, ctx }) => {
            const vendorId = ctx.user.id;
            
            const getResult = await db.send(
                new GetCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Key: { id: input.id },
                })
            );

            const item = getResult.Item;
            if (!item || (item.vendorId !== vendorId && item.owner !== vendorId)) {
                throw new Error("Unauthorized to update this listing");
            }

            const updatedItem = {
                ...item,
                status: input.status,
                updatedAt: new Date().toISOString(),
                _lastChangedAt: Date.now(),
            };

            await db.send(
                new PutCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Item: updatedItem,
                })
            );

            return updatedItem;
        }),
});
