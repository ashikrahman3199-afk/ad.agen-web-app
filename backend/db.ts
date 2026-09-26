import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION?.replace(/\s+/g, '') || "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.replace(/\s+/g, '') || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.replace(/\s+/g, '') || "",
        ...(process.env.AWS_SESSION_TOKEN && {
            sessionToken: process.env.AWS_SESSION_TOKEN.replace(/\s+/g, '')
        })
    },
});

export const db = DynamoDBDocumentClient.from(client);
