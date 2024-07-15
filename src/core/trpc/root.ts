import { createTRPCRouter, tn, createCallerFactory } from "~/core/trpc/trpc";
import { postRouter } from "./routers/post";
import { deptRouter } from './routers/dept';
import { userRouter } from "./routers/user";

import { roleRouter } from './routers/role';
import { menuRouter } from './routers/menu';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  dept: deptRouter,
  user: userRouter,
  role: roleRouter,
  menu: menuRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
