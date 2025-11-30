import "next-intl";
import messages from "./messages/en.json";

declare module "next-intl" {
  export type Locale = "en" | "de" | "fr" | "ar"; // أو استخدم routing.locales
  export type Messages = typeof messages; // كل الـ namespaces تتعرف تلقائيًا
}
