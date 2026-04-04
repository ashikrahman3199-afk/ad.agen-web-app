import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { listingsRouter } from "./routes/listings";
import { bookingsRouter } from "./routes/bookings";
import { authRouter } from "./routes/auth";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  listings: listingsRouter,
  bookings: bookingsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
