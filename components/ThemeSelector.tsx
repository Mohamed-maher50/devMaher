"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

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

export function ThemeSelector() {
  const { setThemes, themes, setSelectedTheme, selectedTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  // const [isCreating, setIsCreating] = useState(false);
  // const [customTheme, setCustomTheme] = useState<Partial<ThemePalette> | null>(
  //   null,
  // );

  // const handleSaveCustomTheme = (newTheme: ThemePalette) => {
  //   setThemes([...themes, newTheme]);
  //   setSelectedTheme(newTheme.id);
  //   setIsCreating(false);
  //   setCustomTheme(null);
  // };

  const handleDeleteTheme = (themeId: string) => {
    if (themeId.length > 0 && themeId !== "theme-light") {
      setThemes(themes.filter((t) => t.id !== themeId));
      if (selectedTheme === themeId) {
        setSelectedTheme("theme-light");
      }
    }
  };

  return (
    <div className="relative ">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-accent/5 pointer-events-none" />
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="theme pallet"
        className="  fixed bottom-5 right-5 cursor-pointer z-10 flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette size={20} />
      </motion.button>

      {/* Menu overlay and content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed z-50 left-1/2 top-1/2  max-sm:max-w-10/12 sm:w-2/3 -translate-y-1/2 -translate-x-1/2 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl "
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Choose Your Theme
                  </h2>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ rotate: 90 }}
                    className="text-muted-foreground  hover:text-foreground transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Preset themes grid */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-4">
                    Preset Themes
                  </p>
                  <div className="grid grid-cols-2  text-center justify-center max-sm:place-items-center w-full items-center md:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                      {defaultThemes.map((theme) => (
                        <div key={theme.id} className={cn(theme.id, "")}>
                          <motion.div
                            key={theme.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", damping: 20 }}
                          >
                            <ThemeCard
                              theme={theme}
                              selectedTheme={selectedTheme}
                              isSelected={selectedTheme === theme.id}
                              onSelect={() => setSelectedTheme(theme.id)}
                              onDelete={() => handleDeleteTheme(theme.id)}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Create custom theme button */}
                {/* <motion.button
                  onClick={() => setIsCreating(true)}
                  className="w-full py-3 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-foreground font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={20} />
                  Create Custom Theme
                </motion.button> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom theme creator modal */}
      {/* <AnimatePresence>
        {isCreating && (
          <ColorPicker
            onSave={handleSaveCustomTheme}
            onCancel={() => {
              setIsCreating(false);
              setCustomTheme(null);
            }}
          />
        )}
      </AnimatePresence> */}
    </div>
  );
}

function ThemeCard({
  theme,
  isSelected,
  onSelect,
  onDelete,
  selectedTheme,
}: {
  theme: ThemePalette;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  selectedTheme: string;
}) {
  return (
    <motion.div
      onClick={onSelect}
      className={`relative cursor-pointer max-sm:size-32 grid gap-1.5 group p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn("grid  grid-cols-2 gap-2 mb-3", ``)}>
        <>
          {[0, 1, 2, 3].map((key) => (
            <motion.div
              key={key}
              className={cn(
                "aspect-square rounded-md border border-border/50 shadow-sm",
                ["bg-primary", "bg-secondary", "bg-accent", "bg-background"][
                  key
                ],
              )}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </>
      </div>
      {/* Color swatches */}

      {/* Theme name */}
      <p className="text-sm font-semibold text-foreground text-nowrap capitalize">
        {theme.name}
      </p>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full"
        />
      )}

      {/* Delete button (for custom themes) */}
      <div className={selectedTheme}>
        {!["ocean", "sunset", "forest", "violet"].includes(theme.id) && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute  -top-3 -right-3 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            <X size={14} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
