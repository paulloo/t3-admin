// !! todo: this file may not work as expected

import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { cache } from "react";
import { headers } from "next/headers";
import { type AppRouter } from "~/core/trpc/root";
import { createTRPCContext } from "~/core/trpc/trpc";
export { appRouter } from "~/core/trpc/root";
export { createTRPCContext }

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
    const heads = new Headers(headers());
    heads.set("x-trpc-source", "rsc");
  
    return createTRPCContext({
      headers: heads,
    });
  });
  

export const api = createTRPCReact<AppRouter>(createContext);

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
