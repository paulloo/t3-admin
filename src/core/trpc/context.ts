import type { inferAsyncReturnType } from "@trpc/server";
import type { Session } from "next-auth";
import { headers } from "next/headers";
import { cache } from "react";
import { createTRPCContext } from "./trpc";
import { getServerAuthSession } from "~/utils/auth/users";

/**
 * Create the context for incoming request.
 * TODO: Add Clerk
 * @see https://trpc.io/docs/server/context
 */
export const createContext =  cache(async () => {
  // return { user: session?.user };
  const session = await getServerAuthSession();

  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
    // user: session?.user
  });
})

export type Context = inferAsyncReturnType<typeof createContext>;
