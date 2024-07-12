"use client";

import Link from "next/link";
import { Form } from "~/app/components/Form";
import { redirect } from "next/navigation";
import { SubmitButton } from "~/app/components/submit-button";
import { useEffect, useRef, useState } from "react";

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

import { api } from "~/core/trpc/infer";

export default function SystemMenuPage() {
  const { data: menuList, isLoading, error } = api.menu.getList.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>图标</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>节点路由</TableHead>
            <TableHead>文件路径</TableHead>
            <TableHead>权限标识</TableHead>
            <TableHead>排序</TableHead>
            <TableHead>路由缓存</TableHead>
            <TableHead>是否显示</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>更新时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuList?.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.icon}</TableCell>
              <TableCell>{role.type}</TableCell>
              <TableCell>{role.path}</TableCell>
              <TableCell>{role.component}</TableCell>
              <TableCell>{role.permission}</TableCell>
              <TableCell>{role.order_no}</TableCell>
              <TableCell>{role.component}</TableCell>
              <TableCell>{role.show}</TableCell>
              <TableCell>{role.status}</TableCell>
              <TableCell>{role.updated_at.toISOString()}</TableCell>
              <TableCell>编辑、删除</TableCell>
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
