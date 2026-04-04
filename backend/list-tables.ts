import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

async function listTables() {
    try {
        const command = new ListTablesCommand({});
        const response = await client.send(command);
        console.log("Tables:", response.TableNames);
    } catch (err) {
        console.error("Error listing tables:", err);
    }
}

listTables();
