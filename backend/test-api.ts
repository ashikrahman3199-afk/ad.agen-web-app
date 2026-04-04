import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

async function main() {
    const ctx = await createContext({} as any);
    const caller = appRouter.createCaller(ctx);

    console.log("Listing services...");
    const services = await caller.listings.list();
    console.log("Services:", services);

    console.log("Creating a new service...");
    const newService = await caller.listings.create({
        name: "Test Billboard " + Date.now(),
        categoryId: "billboards",
        price: 1000,
        location: "Test Location",
        description: "Test Description",
    });
    console.log("Created Service:", newService);

    console.log("Listing bookings...");
    const bookings = await caller.bookings.list();
    console.log("Bookings:", bookings);
}

main().catch((err) => {
    console.error("Error:", err);
});
