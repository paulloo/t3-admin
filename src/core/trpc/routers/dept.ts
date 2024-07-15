import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/core/trpc/trpc";



export const deptRouter = createTRPCRouter({
    getList: protectedProcedure.query(async ({ ctx }) => {
        const deptTree = await ctx.db.sys_dept.findMany({
          where: {
            parentId: null // 这会查找所有顶级部门
          },
          include: {
            other_sys_dept: {
              include: {
                other_sys_dept: {
                  include: {
                    other_sys_dept: true // 你可以根据需要继续嵌套
                  }
                }
              }
            }
          },
          orderBy: {
            orderNo: 'asc' // 假设你想按 orderNo 排序
          }
        });
        
        const renameChildrenField = (dept: any): any => {
          if (dept.other_sys_dept) {
            dept.children = dept.other_sys_dept.map(renameChildrenField);
            delete dept.other_sys_dept;
          }
          return dept;
        };
      
        const formattedDeptTree = deptTree.map(renameChildrenField);
      
        return formattedDeptTree;

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

        return ctx.db.sys_dept.create({
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
