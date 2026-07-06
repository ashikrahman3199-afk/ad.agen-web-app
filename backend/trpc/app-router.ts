import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { listingsRouter } from "./routes/listings";
import { bookingsRouter } from "./routes/bookings";
import { authRouter } from "./routes/auth";
import { campaignsRouter } from "./routes/campaigns";
import { adminRouter } from "./routes/admin";
import { vendorRouter } from "./routes/vendor";
import { paymentRouter } from "./routes/payment";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  listings: listingsRouter,
  bookings: bookingsRouter,
  auth: authRouter,
  campaigns: campaignsRouter,
  admin: adminRouter,
  vendor: vendorRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
