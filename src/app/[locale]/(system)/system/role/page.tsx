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
import { Shell } from "~/islands/wrappers/shell-variants";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/islands/navigation/page-header";
import { Metadata } from "next";
import { fullURL } from "~/data/meta/builder";
import { isEmpty } from "radash";


// export const metadata = seo({
  export const metadata: Metadata = {
    metadataBase: fullURL(),
    title: "system user",
    description: "Manage your website and account preferences.",
  };
  

export default async function SystemRolePage() {
  const roleList = await api.role.getList();
  console.log('roleList:', roleList)

  return (<Shell variant="sidebar">
    <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Settings</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your website and account preferences.
        </PageHeaderDescription>
      </PageHeader>
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
    </Shell>
  );
}
