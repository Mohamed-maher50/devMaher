import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./lib/i18n/request.ts",

  experimental: {
    createMessagesDeclaration: "./messages/en.json",
    messages: {
      path: "./messages",
      format: "json",
      locales: "infer",
    },
  },
});
export default withNextIntl(nextConfig);
