import MenuListCtx from '~/islands/menu-list'
import { api } from "~/core/trpc/server";
import { Shell } from "~/islands/wrappers/shell-variants";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/islands/navigation/page-header";

export default async function SystemMenuPage() {
  const menuList = await api.menu.getList();

  return (<Shell variant="sidebar">
    <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Menu</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your system menu.
        </PageHeaderDescription>
      </PageHeader>
    <div className="flex w-screen items-center justify-center bg-gray-50">
      <MenuListCtx menu={menuList} />
    </div>
    </Shell>
  );
}
