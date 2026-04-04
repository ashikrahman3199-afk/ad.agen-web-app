
import app from "./hono";

console.log("Starting backend server on port 3000...");

export default {
    port: 3000,
    fetch: app.fetch,
};
