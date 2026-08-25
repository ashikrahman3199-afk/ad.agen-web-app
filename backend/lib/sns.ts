import { SNSClient } from "@aws-sdk/client-sns";

export const sns = new SNSClient({
    region: process.env.AWS_REGION || "ap-south-1",
});
