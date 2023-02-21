import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Link from "next/link";

const config: DocsThemeConfig = {
  logo: (
    <Link href="/Diet">
      <span>Gazilab</span>
    </Link>
  ),
  project: {
    link: "https://github.com/shuding/nextra-docs-template",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    text: "Nextra Docs Template",
  },
};

export default config;
