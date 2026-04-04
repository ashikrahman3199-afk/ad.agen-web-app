import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAMES } from "../../config";

export const bookingsRouter = createTRPCRouter({
    list: publicProcedure.query(async () => {
        const result = await db.send(
            new ScanCommand({
                TableName: TABLE_NAMES.BOOKING,
            })
        );
        return result.Items || [];
    }),

    create: publicProcedure
        .input(
            z.object({
                serviceId: z.string(),
                startDate: z.string(),
                endDate: z.string(),
                totalAmount: z.number(),
                clientId: z.string().default("mock-client-id"),
            })
        )
        .mutation(async ({ input }) => {
            const id = Date.now().toString();
            const createdAt = new Date().toISOString();

            const item = {
                id,
                ...input,
                status: "Pending",
                createdAt,
                updatedAt: createdAt,
                __typename: "Booking",
            };

            await db.send(
                new PutCommand({
                    TableName: TABLE_NAMES.BOOKING,
                    Item: item,
                })
            );

            return item;
        }),
});
