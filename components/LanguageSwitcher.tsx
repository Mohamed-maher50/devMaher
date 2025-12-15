"use client";
import Cookies from "js-cookie";
import { languages, supportedLanguages } from "@/constants/locales";
import { useRouter } from "@/lib/i18n/navigation";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import { Skeleton } from "./ui/skeleton";

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const onChange = (locale: supportedLanguages) => {
    Cookies.set("NEXT_LOCALE", locale);
    router.push("/", { locale: locale, scroll: false });
  };

  return (
    <motion.div
      className="flex gap-2 font-sora bg-background/80 backdrop-blur-md border border-border rounded-full p-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          // href={"/"}
          className={`px-3 py-1 uppercase rounded-full text-sm font-medium transition-colors ${
            locale === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {lang.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
export default LanguageSwitcher;

export function LanguageSwitcherSkeleton() {
  return (
    <div className="flex gap-2 bg-background/80 backdrop-blur-md border border-border rounded-full p-1">
      {/* إنشاء 3 skeleton buttons */}
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="w-12 h-6 rounded-full" />
      ))}
    </div>
  );
}
