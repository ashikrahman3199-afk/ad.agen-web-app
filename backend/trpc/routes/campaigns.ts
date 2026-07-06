import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAMES } from "../../config";

export const campaignsRouter = createTRPCRouter({
    list: publicProcedure
        .input(z.object({
            clientId: z.string().optional()
        }))
        .query(async ({ input }) => {
            const result = await db.send(
                new ScanCommand({
                    TableName: TABLE_NAMES.BOOKING,
                    FilterExpression: "#type = :type",
                    ExpressionAttributeNames: {
                        "#type": "__typename"
                    },
                    ExpressionAttributeValues: {
                        ":type": "Campaign"
                    }
                })
            );
            
            let campaigns = result.Items || [];
            
            if (input.clientId) {
                campaigns = campaigns.filter(c => c.clientId === input.clientId);
            }
            
            return campaigns;
        }),

    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                objective: z.string().default("General"),
                designStyle: z.string().default("Standard"),
                selectedServices: z.array(z.string()).default([]),
                budget: z.number().default(0),
                startDate: z.string().optional(),
                endDate: z.string().optional(),
                status: z.enum(["draft", "active", "completed"]).default("active"),
                clientId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const id = `CAMP-${Date.now().toString()}`;
            const createdAt = new Date().toISOString();

            const item = {
                id,
                ...input,
                spend: 0,
                createdAt,
                updatedAt: createdAt,
                __typename: "Campaign",
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
