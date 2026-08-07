import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // Keep using the working Render backend
  return 'https://ad-agen-web-app.onrender.com';
};

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      headers: async () => {
        const rawToken = await AsyncStorage.getItem("authToken");
        const token = rawToken?.replace(/[^a-zA-Z0-9\.\-_]/g, '');
        return {
          ...(token && { authorization: `Bearer ${token}` }),
        };
      },
    }),
  ],
});
