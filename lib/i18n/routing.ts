import { defaultLocale, locales } from "@/constants/locales";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeCookie: true,
  localePrefix: "never",
});
