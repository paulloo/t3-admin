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

export default function SystemRolePage() {
  const { data: roleList, isLoading, error } = api.role.getList.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>序号</TableHead>
            <TableHead>角色名称</TableHead>
            <TableHead>角色值</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>备注</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>更新时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roleList?.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>
                {role.name}
              </TableCell>
              <TableCell>{role.value}</TableCell>
              <TableCell>{role.status}</TableCell>
              <TableCell className="w-[100px]">{role.remark}</TableCell>
              <TableCell>
                {role.created_at.toISOString()}
              </TableCell>
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
    </div>
  );
}
