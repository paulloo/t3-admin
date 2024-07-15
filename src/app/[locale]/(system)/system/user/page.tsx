import type { Metadata } from "next";
import { Shell } from "~/islands/wrappers/shell-variants";
import { fullURL } from "~/data/meta/builder";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/islands/navigation/page-header";
import UserListCtx from "~/islands/user-list";

// export const metadata = seo({
export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "system user",
  description: "Manage your website and account preferences.",
};

export default function SystemUserPage() {

  return (<Shell variant="sidebar">
    <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Settings</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your website and account preferences.
        </PageHeaderDescription>
      </PageHeader>
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <UserListCtx />
      
    </div>
    </Shell>
  );
}
