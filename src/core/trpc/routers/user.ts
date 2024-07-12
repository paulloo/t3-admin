import { TRPCError } from "@trpc/server";
import { create } from "domain";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/core/trpc/trpc";

export const userRouter = createTRPCRouter({
    getList: protectedProcedure.query(({ ctx }) => {
        return ctx.db.sys_user.findMany({
          include: {
            sys_user_roles: {
              include: {
                sys_role: true,
              }
            },
            sys_dept: true
          },
        });
    }),
    
    findUser: publicProcedure
      .input(z.object({
        id: z.number().optional(),
        username: z.string().optional()
      }).refine(data => data.id !== undefined || data.username !== undefined, {
        message: "Either id or username must be provided"
      }))
      .query(async ({ ctx, input }) => {
        const { id, username } = input;

        const user = await ctx.db.sys_user.findUnique({
          where: id !== undefined ? { id } : { username },
          include: {
            sys_user_roles: {
              include: {
                sys_role: true,
              }
            },
            sys_dept: true
          },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        // 移除敏感信息
        const { password, psalt, ...safeUser } = user;

        return safeUser;
      }),
});
