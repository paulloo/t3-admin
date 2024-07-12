import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/core/trpc/trpc";

export const roleRouter = createTRPCRouter({
    getList: protectedProcedure.query(({ ctx }) => {
        return ctx.db.sys_role.findMany();
    }),
    create: protectedProcedure
      .input(z.object({ 
        parentId: z.number().min(1),
        deptName: z.string().min(1),
        orderNum: z.number().min(1),
        leader: z.string().min(1),
        phone: z.string().min(1),
        status: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        // simulate a slow db call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return ctx.db.sys_role.create({
          data: {
            parent_id: input.parentId,
            dept_name: input.deptName,
            order_num: input.orderNum,
            leader: input.leader,
            phone: input.phone,
            status: input.status,
            create_by: ctx.session.user.id,
          },
        });
      }),
});
