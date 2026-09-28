import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "valid",
        secretAccessKey: "invalid\nkey"
    }
});

async function run() {
    try {
        await client.send(new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: "test",
            AuthParameters: { USERNAME: "test", PASSWORD: "password" }
        }));
    } catch (e) {
        console.error("ERROR CAUGHT:");
        console.error(e.message);
    }
}
run();
