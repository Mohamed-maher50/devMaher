"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import * as motion from "motion/react-client";
function getInitialTheme() {
  if (typeof window === "undefined") return false; // Handle SSR/Next.js safely
  const savedTheme = localStorage.getItem("mode");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return systemPrefersDark;
}
export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(getInitialTheme());
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative text-muted-foreground hover:text-foreground"
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={true}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={true}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
    </Button>
  );
};
