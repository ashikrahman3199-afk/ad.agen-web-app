import { SNSClient } from "@aws-sdk/client-sns";

export const sns = new SNSClient({
    region: process.env.AWS_REGION?.replace(/\s+/g, '') || "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.replace(/\s+/g, '') || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.replace(/\s+/g, '') || "",
        ...(process.env.AWS_SESSION_TOKEN && {
            sessionToken: process.env.AWS_SESSION_TOKEN.replace(/\s+/g, '')
        })
    },
});
