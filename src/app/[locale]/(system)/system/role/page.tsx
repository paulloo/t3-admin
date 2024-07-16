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
import RoleListCtx from '~/islands/role-list';


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
        <PageHeaderHeading size="sm">Roles</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your system roles.
        </PageHeaderDescription>
      </PageHeader>
    <div className="flex w-screen items-center justify-center bg-gray-50">
      <RoleListCtx roles={roleList} />
    </div>
    </Shell>
  );
}
