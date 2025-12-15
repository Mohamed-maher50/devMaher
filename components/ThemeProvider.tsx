"use client";
export interface ThemePalette {
  id: string;
  name: string;
}

const defaultThemes: ThemePalette[] = [
  {
    id: "theme-light",
    name: "default",
  },
  {
    id: "theme-green",
    name: "green",
  },
  {
    id: "cosmic-night",
    name: "cosmic-night",
  },
  {
    id: "amber-minimal",
    name: "amber minimal",
  },
];
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  Dispatch,
  useState,
  useEffect,
} from "react";
function getInitialThemeMode() {
  if (typeof window === "undefined") return false; // Handle SSR/Next.js safely
  const savedTheme = localStorage.getItem("mode");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return systemPrefersDark;
}
interface ThemeContextType {
  themes: ThemePalette[];
  setThemes: Dispatch<SetStateAction<ThemePalette[]>>;
  setSelectedTheme: Dispatch<SetStateAction<string>>;
  selectedTheme: string;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const getInitialTheme = () => {
  if (typeof window === "undefined") return "theme-light"; // Handle SSR/Next.js safely
  const savedTheme = localStorage.getItem("theme");
  return savedTheme || "theme-light";
};
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themes, setThemes] = useState<ThemePalette[]>(defaultThemes);
  const [isDark, setIsDark] = useState(getInitialThemeMode());
  const [selectedTheme, setSelectedTheme] = useState<string>(getInitialTheme());
  const applyTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      // Remove any existing theme classes and add the new one (if provided)
      const root = document.body;
      const themeCandidates = [...themes.map((t) => t.id).filter(Boolean)];

      // Remove existing theme classes
      Array.from(root.classList).forEach((cls) => {
        if (themeCandidates.includes(cls)) root.classList.remove(cls);
      });

      // If themeId is not empty, add it; otherwise we only remove theme classes
      if (themeId && themeId.length > 0) {
        root.classList.add(themeId);
      }
    }
  };
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  }, [isDark]);
  useEffect(() => {
    if (defaultThemes.some((t) => t.id === selectedTheme))
      localStorage.setItem("theme", selectedTheme);
    applyTheme(selectedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);
  return (
    <ThemeContext.Provider
      value={{
        setThemes,
        themes,
        setSelectedTheme,
        selectedTheme,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error(`theme provider not configure`);
  return context;
};
