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
import Tree from "~/app/components/Tree";

export default function SystemDeptPage() {
  const { data: deptList, isLoading, error } = api.dept.getList.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (<div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>部门名称</TableHead>
            <TableHead>排序</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <Tree data={deptList} />
          {/* {deptList?.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.name}</TableCell>
              <TableCell>{dept.orderNo}</TableCell>
              <TableCell>{dept.updated_at.toISOString()}</TableCell>
              <TableCell>编辑、删除</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table></div>
  );
}
