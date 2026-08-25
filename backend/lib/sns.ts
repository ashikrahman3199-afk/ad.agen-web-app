import { SNSClient } from "@aws-sdk/client-sns";

export const sns = new SNSClient({
    region: process.env.AWS_REGION?.trim() || "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim() || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.trim() || "",
    },
});
