
import { api } from "~/core/trpc/server";
import Tree from "~/app/components/Tree";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell-variants";
import DeptListCtx from '~/islands/dept-list';

export default async function SystemDeptPage() {
  const deptList = await api.dept.getList();
  console.log("deptList: ", deptList)

  return (
    <Shell variant="sidebar">
    <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Menu</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your system menu.
        </PageHeaderDescription>
      </PageHeader>
    <div className="flex w-screen items-center justify-center bg-gray-50">
      <DeptListCtx deptList={deptList} />
    </div>
    </Shell>
  );
}
