import { create } from "domain";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getlist: protectedProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany();
    }),
    
    findUser: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.sys_user.findMany({
          where: {
            user_name: ctx.session.user.name || '',
          },
        });
      }),
});
