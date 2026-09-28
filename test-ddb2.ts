import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "invalid\nkey",
        secretAccessKey: "valid"
    }
});

async function run() {
    try {
        await client.send(new ListTablesCommand({}));
    } catch (e) {
        console.error("ERROR CAUGHT:");
        console.error(e.message);
    }
}
run();
