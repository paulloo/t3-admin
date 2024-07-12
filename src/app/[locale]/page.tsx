// import { getServerAuthSession } from "~/utils/auth/users";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { authOptions } from "~/core/auth/authjs";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { siteConfig } from "~/app";
import { api } from "~/core/trpc";

import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { getServerAuthSession, getUserData } from "~/utils/auth/users";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const metadata: Metadata = {
    title: `${t("metadata.title.home")} – ${siteConfig.name}`,
  };
  return metadata;
}


async function TestCom() {
  const session = await getServerAuthSession();
  return (<div className="flex flex-col items-center justify-center gap-4">
    <p className="text-center text-2xl text-white">
      {session && <span>Logged in as {session.user?.name}</span>}
    </p>
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      {session ? "Sign out" : "Sign in"}
    </Link>
  </div>)
}

export default function HomePage() {
  
  // const session = await getServerSession(authOptions);
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const {  data: deptList, isLoading } = api.dept.getList.useQuery()
  // console.log("deptList: ", deptList);
  const deptList = []
  const t = useTranslations();

  return (<>
  <SiteHeader />
    <GeneralShell>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps {t("landing.main-cta")} →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}

            <TestCom />
          </div>

          {/* <CrudShowcase /> */}
        </div>
      </main>
    </div>
    </GeneralShell>
    <SiteFooter />
    </>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = [];

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       {/* <CreatePost /> */}
//     </div>
//   );
// }
