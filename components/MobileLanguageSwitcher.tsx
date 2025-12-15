"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/i18n/navigation";
import { useLocale } from "next-intl";
import { EXTENDED_LANGUAGES, supportedLanguages } from "@/constants/locales";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface LanguageSwitcherProps {
  currentLanguage?: string;
  onLanguageChange?: (languageCode: string) => void;
}

const MobileLanguageSwitcher = ({
  currentLanguage = "en",
  onLanguageChange,
}: LanguageSwitcherProps) => {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onChange = (locale: supportedLanguages) => {
    Cookies.set("NEXT_LOCALE", locale);
    // Source - https://stackoverflow.com/a/66166897
    // Posted by Muljayan
    // Retrieved 2025-11-28, License - CC BY-SA 4.0

    router.push("/", { locale: locale, scroll: false });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 px-0 md:px-3 md:w-auto"
          aria-label="Change language"
        >
          <Globe className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline text-sm">
            {locale.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {EXTENDED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              onChange(lang.code);
              setOpen(false);
            }}
            className="cursor-pointer"
            aria-current={currentLanguage === lang.code ? "page" : undefined}
          >
            <span className="mr-2 uppercase">{lang.code}</span>
            <span
              className={cn(
                "flex-1  text-xs font-sora  font-medium uppercase",
                lang.code == "ar" && "font-cairo"
              )}
            >
              {lang.label}
            </span>
            {locale === lang.code && (
              <span className="ml-2 font-inter font-semibold text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default MobileLanguageSwitcher;

export function MobileLanguageSwitcherSkeleton() {
  return <Skeleton className="w-10 h-10 rounded-full" />;
}
