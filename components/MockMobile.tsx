"use client";

import * as React from "react";
import {
  Moon,
  Sun,
  Languages,
  Palette,
  Smartphone,
  Globe,
  Settings2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export function MobileShell() {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = React.useState("ar");
  const [activeTheme, setActiveTheme] = React.useState("default");

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (activeTheme === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", activeTheme);
    }
  }, [activeTheme]);

  const themes = [
    { name: "Default", value: "default", color: "bg-primary" },
    { name: "Emerald", value: "emerald", color: "bg-emerald-500" },
    { name: "Rose", value: "rose", color: "bg-rose-500" },
    { name: "Amber", value: "amber", color: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="relative mx-auto border-gray-900 dark:border-muted bg-gray-900 border-8 rounded-[2.5rem] h-[550px] w-[300px] shadow-xl overflow-hidden">
        <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background flex flex-col">
          {/* Status Bar */}
          <div className="h-6 w-full flex items-center justify-between px-6 pt-2">
            <span className="text-[10px] font-bold">
              {new Date().toLocaleTimeString()}
            </span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
              <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
            </div>
          </div>

          {/* Header/Controls */}
          <header className="p-4 border-b flex items-center justify-between bg-card">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm">موقعي</span>
            </div>

            <div className="flex items-center gap-1">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Languages className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("ar")}>
                    العربية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Palette className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-xs">
                    اختر الثيم
                  </DropdownMenuLabel>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {themes.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setActiveTheme(t.value)}
                        className={cn(
                          "w-full h-8 rounded-md flex items-center justify-center border transition-all",
                          activeTheme === t.value
                            ? "border-primary ring-1 ring-primary"
                            : "border-transparent"
                        )}
                      >
                        <div className={cn("w-4 h-4 rounded-full", t.color)} />
                      </button>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" /> فاتح
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" /> داكن
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Web Content Area */}
          <ScrollArea className="h-max  gap-5 overflow-y-hidden p-4 space-y-10 bg-muted/10">
            <div className="space-y-7">
              <div className="h-32 rounded-xl bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/20">
                <Globe className="w-8 h-8 text-primary/40 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold text-center">
                أهلاً بك في موقعنا
              </h2>
              <p className="text-sm text-center text-muted-foreground leading-relaxed">
                هذه هي شاشة الموبايل التي تحتوي على موقعك الخاص مع أدوات التحكم
                المتقدمة.
              </p>
            </div>

            <Card className="p-4 my-4 flex flex-col gap-10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">الإعدادات الحالية</h3>
                  <p className="text-[10px] text-muted-foreground">
                    اللغة: {language === "ar" ? "العربية" : "English"}
                  </p>
                </div>
              </div>
              <Button className="w-full text-xs h-8">ابدأ الآن</Button>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-card border shadow-sm p-3 flex flex-col justify-end"
                >
                  <div className="h-2 w-3/4 bg-muted rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Navigation Bar */}
          <nav className="h-16 border-t bg-card flex items-center justify-around px-2">
            <div className="flex flex-col items-center gap-1 opacity-100">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mb-1"></div>
              <div className="w-5 h-5 rounded bg-primary/20"></div>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-5 h-5 rounded bg-foreground/20"></div>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-5 h-5 rounded bg-foreground/20"></div>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-5 h-5 rounded bg-foreground/20"></div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
