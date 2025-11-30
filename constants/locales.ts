export const locales = ["en", "de", "fr", "ar"] as const;
export type supportedLanguages = (typeof locales)[number];
export const localeLabels: Record<supportedLanguages, string> = {
  en: "En",
  de: "De",
  fr: "Fr",
  ar: "Ar",
};

export const languages = Object.entries(localeLabels).map(
  ([code, label]): { code: supportedLanguages; label: string } => ({
    code: code as supportedLanguages,
    label,
  })
);
export const defaultLocale: supportedLanguages = "en";
