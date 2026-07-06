import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../create-context";
import { db } from "../../db";
import { ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAMES } from "../../config";

export const adminRouter = createTRPCRouter({
    getPendingServices: publicProcedure.query(async () => {
        const result = await db.send(
            new ScanCommand({
                TableName: TABLE_NAMES.SERVICE,
                FilterExpression: "approvalStatus = :status OR #s = :sStatus",
                ExpressionAttributeNames: {
                    "#s": "status",
                },
                ExpressionAttributeValues: {
                    ":status": "PENDING",
                    ":sStatus": "Pending",
                },
            })
        );
        return (result.Items || []).map(item => ({
            ...item,
            name: item.title || item.name,
        }));
    }),

    approveService: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            const result = await db.send(
                new UpdateCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Key: { id: input.id },
                    UpdateExpression: "SET approvalStatus = :status, #s = :active",
                    ExpressionAttributeNames: {
                        "#s": "status",
                    },
                    ExpressionAttributeValues: {
                        ":status": "APPROVED",
                        ":active": "Active",
                    },
                    ReturnValues: "ALL_NEW",
                })
            );
            return result.Attributes;
        }),

    rejectService: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            await db.send(
                new DeleteCommand({
                    TableName: TABLE_NAMES.SERVICE,
                    Key: { id: input.id },
                })
            );
            return { success: true };
        }),

    getVendors: publicProcedure.query(async () => {
        const result = await db.send(
            new ScanCommand({
                TableName: TABLE_NAMES.VENDOR,
                FilterExpression: "#r = :vendor",
                ExpressionAttributeNames: {
                    "#r": "role",
                },
                ExpressionAttributeValues: {
                    ":vendor": "vendor",
                },
            })
        );
        return result.Items || [];
    }),
});
