import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { verify } from "hono/jwt";

// Use a secure secret in production from environment variables!
const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret-rork-2026";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const authHeader = opts.req.headers.get("authorization");
  let user: { id: string; role: string; phoneNumber: string } | null = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = await verify(token, JWT_SECRET);
      user = decoded as unknown as typeof user;
    } catch (e) {
      // Invalid or expired token
      user = null;
    }
  }

  return {
    req: opts.req,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
