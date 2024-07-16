/**
 * [app.ts] App Configuration
 * ==========================
 *
 * To reduce the number of config files, we aim to
 * combine as much as possible into a single file.
 */

import type { OAuthStrategy } from "@clerk/types";
import type { ContentSection, FooterItem, MainMenuItem } from "~/types";
import { slugify } from "~/utils";

import { productCategories } from "~/server/config/products";
import { networks } from "~/server/config/socials";

import { env } from "./env.mjs";
import { Icons } from "./islands/icons";

// todo: parse this from clerk's dashboard instead of hardcoding it
export const oauthProvidersClerk = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" },
  // { name: "Microsoft", strategy: "oauth_microsoft", icon: "microsoft" },
  // { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  // { name: "Github", strategy: "oauth_github", icon: "gitHub" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: OAuthStrategy;
}[];

export const appts = {
  name: "T3 Admin",
  debug: false,
  social: networks({
    youtube: "@paulloo",
    discord: "paulloo",
    facebook: "groups/paulloo",
    twitter: "paullood",
    github: "paulloo",
  }),
};

export default appts;

const links = {
  twitter: "https://x.com/paullood",
  github: "https://github.com/paulloo/t3-admin",
  githubAccount: "https://github.com/paulloo",
  discord: "https://discord.com/invite/wCA2CUHRPB",
  facebook: "https://facebook.com/groups/paulloo",
};

export const contactConfig = {
  email: "blefnk@gmail.com",
};

export const REPOSITORY_OWNER = "paulloo";
export const REPOSITORY_NAME = "t3-admin";
export const REPOSITORY_URL = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;
export const DISCORD_URL = "https://discord.com/invite/wCA2CUHRPB";
export const baseUrl = new URL(
  env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
);

export const BASE_URL =
  process.env.NODE_ENV === "production" ? baseUrl : "http://localhost:3000";
export const BRAND_NAME = "T3Admin";
export const BRAND_DESCRIPTION =
  "Next.js 14 free store and dashboard template. It helps you build great eCommerce and SaaS apps faster than ever. Get it now!";

export const OWNER_ROLE = "owner";
export const ADMIN_ROLE = "admin";
export const MEMBER_ROLE = "member";

export const TRIAL_LENGTH_IN_DAYS = 7;
export const ROLES = [OWNER_ROLE, ADMIN_ROLE, MEMBER_ROLE] as const;

export const settings = {
  themeToggleEnabled: true,
};

export const siteConfig = {
  name: "T3Admin",
  shortName: "T3Admin",
  author: "Nazarii Korniienko",
  description:
    "NextJS 14 free starter: store, landing, dashboard. It helps you build great eCommerce and SaaS apps faster than ever. Get it!",
  company: {
    name: "Wealth Ape",
    link: "https://github.com/paulloo/t3-admin",
    email: "dongpoding@gmail.com",
    twitter: "@paullood",
  },
  handles: {
    twitter: "@paullood",
  },
  keywords: [
    "App Router",
    "paulloo",
    "t3-admin",
    "Drizzle Orm",
    "Prisma Orm",
    "Landing Page",
    "Next.js 14",
    "Nextjs",
    "Open Source",
    "Parallel Routes",
    "PostgreSQL",
    "MysqlSQL",
    "Radix Ui",
    "React",
    "T3Admin",
    "Server Actions",
    "Server Components",
    "Shadcn/UI",
    "Starter",
    "Stripe",
    "T3 Stack",
    "Tailwind Css",
    "Template",
    "Tools",
    "Utils",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: REPOSITORY_OWNER,
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  mainNav: [
    {
      title: "系统管理",
      items: [
        {
          title: "用户管理",
          href: "/system/user",
          description: "system user management.",
          items: [],
        },
        {
          title: "角色管理",
          href: "/system/role",
          description: "system role management.",
          items: [],
        },
        {
          title: "菜单管理",
          href: "/system/menu",
          description: "system menu management.",
          items: [],
        },
        // {
        //   title: "Products",
        //   href: "/products",
        //   description: "All the products we have to offer.",
        //   items: [],
        // },
        // {
        //   title: "Build a Look",
        //   href: "/custom/clothing",
        //   description: "Build your own custom clothes.",
        //   items: [],
        // },
        // {
        //   title: "Blog",
        //   href: "/blog",
        //   description: "Read our latest blog posts.",
        //   items: [],
        // },
      ],
    },
    // ...productCategories.map((category) => ({
    //   title: category.title,
    //   items: [
    //     {
    //       title: "All",
    //       href: `/categories/${slugify(category.title)}`,
    //       description: `All ${category.title}.`,
    //       items: [],
    //     },
    //     ...category.subcategories.map((subcategory) => ({
    //       title: subcategory.title,
    //       href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
    //       description: subcategory.description,
    //       items: [],
    //     })),
    //   ],
    // })),
  ] satisfies MainMenuItem[],
  links,
  footerNav: [
    {
      title: "Bleverse",
      items: [
        {
          title: "Community",
          href: "https://bleverse.com",
          external: true,
        },
        {
          title: "MF Piano",
          href: "https://mfpiano.org",
          external: true,
        },
        {
          title: "Peresfer",
          href: "https://peresfer.com",
          external: true,
        },
        {
          title: "T3Admin",
          href: "https://T3Admin.bleverse.com",
          external: true,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "About",
          href: "/about",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Github",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
      ],
    },
    {
      title: "Github",
      items: [
        {
          title: "T3Admin",
          href: "https://github.com/blefnk/T3Admin",
          external: true,
        },
        {
          title: "Reliverse",
          href: "https://github.com/blefnk/reliverse",
          external: true,
        },
        {
          title: "Blefnk",
          href: "https://github.com/blefnk",
          external: true,
        },
        {
          title: "Utils",
          href: "https://github.com/blefnk/utils",
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};

export const featureCards: ContentSection = {
  header: "Powered by",
  subheader: "What Makes T3Admin Possible",
  content: [
    {
      text: "Next.js",
      subtext: "The React Framework",
    },
    {
      text: "shadcn/ui",
      subtext: "Beautifully Designed Components",
    },
    {
      text: "Vercel",
      subtext: "Develop. Preview. Ship.",
    },
  ],
};

export const features: ContentSection = {
  header: "Features",
  subheader: "Why You Need to Download T3Admin",
  content: [
    {
      text: "SEO Optimized",
      subtext: "Improved website visibility on search engines",
    },
    {
      text: "Highly Performant",
      subtext: "Fast loading times and smooth performance",
    },
    {
      text: "Easy Customization",
      subtext: "Change your content and layout with little effort",
    },
  ],
};
