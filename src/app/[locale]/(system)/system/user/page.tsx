import type { Metadata } from "next";
import { Shell } from "~/islands/wrappers/shell-variants";
import { fullURL } from "~/data/meta/builder";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/islands/navigation/page-header";
import UserListCtx from "~/islands/user-list";
import { api } from "~/core/trpc/server";

// export const metadata = seo({
export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "system user",
  description: "Manage your website and account preferences.",
};

export default async function SystemUserPage() {
  const data = await api.user.getList();
  return (<Shell variant="sidebar">
    <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Users</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your system users.
        </PageHeaderDescription>
      </PageHeader>
    <div className="flex w-screen items-center justify-center bg-gray-50">
      <UserListCtx users={data} />
      
    </div>
    </Shell>
  );
}
