import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/islands/primitives/table";
import { api } from "~/core/trpc/server";
// import { api } from "~/core/trpc/server2";

import { Avatar, AvatarFallback, AvatarImage } from "~/islands/primitives/ui/avatar";

export default async function UserListCtx() {

  const data = await api.user.getList();

  return (
    <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>序号</TableHead>
            <TableHead>头像</TableHead>
            <TableHead>用户名</TableHead>
            <TableHead>呢称</TableHead>
            <TableHead className="w-[100px]">所在部门</TableHead>
            <TableHead>所属角色</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead className="w-[100px]">手机</TableHead>
            <TableHead>备注</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>修改时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar>
                  {user.avatar && (
                    <AvatarImage src={user.avatar} alt="@shadcn" />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell className="w-[100px]">{user.sys_dept?.name}</TableCell>
              <TableCell>
                {user.sys_user_roles.map((role) => {
                  return <div>{role.sys_role.name}</div>;
                })}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="w-[100px]">{user.phone}</TableCell>
              <TableCell>{user.remark}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.created_at.toISOString()}</TableCell>
              <TableCell>{user.updated_at.toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
  );
}
