
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from './trpc/app-router';
import { sns } from './lib/sns';
import { PublishCommand } from '@aws-sdk/client-sns';

async function testOTP() {
    console.log("Testing OTP Sending...");
    console.log("AWS Region:", process.env.AWS_REGION);
    console.log("AWS Access Key Present:", !!process.env.AWS_ACCESS_KEY_ID);

    try {
        const phoneNumber = "+919876543210"; // Use a dummy valid format
        const code = "123456";

        console.log(`Sending to ${phoneNumber}...`);

        const result = await sns.send(
            new PublishCommand({
                PhoneNumber: phoneNumber,
                Message: `Test OTP: ${code}`,
                MessageAttributes: {
                    'AWS.SNS.SMS.SMSType': {
                        DataType: 'String',
                        StringValue: 'Transactional',
                    },
                },
            })
        );
        console.log("SNS Send Success:", result.MessageId);
    } catch (error: any) {
        console.error("SNS Send Failed:", error.message);
        console.error("Full Error:", error);
    }
}

testOTP();
