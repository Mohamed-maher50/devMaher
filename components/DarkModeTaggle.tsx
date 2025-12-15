"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import * as motion from "motion/react-client";
import { Skeleton } from "./ui/skeleton";
import { useTheme } from "./ThemeProvider";

const DarkModeToggle: React.FC = () => {
  const { isDark, setIsDark } = useTheme();

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
export default DarkModeToggle;
export function DarkModeToggleSkeleton() {
  return (
    <div className="relative w-10 h-10">
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
  );
}
