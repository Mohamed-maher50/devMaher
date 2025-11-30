"use client";
import Cookies from "js-cookie";
import { languages, supportedLanguages } from "@/constants/locales";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { motion } from "motion/react";
import { useLocale } from "next-intl";

const MotionLink = motion.create(Link);

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const onChange = (locale: supportedLanguages) => {
    Cookies.set("NEXT_LOCALE", locale);
    // Source - https://stackoverflow.com/a/66166897
    // Posted by Muljayan
    // Retrieved 2025-11-28, License - CC BY-SA 4.0

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
