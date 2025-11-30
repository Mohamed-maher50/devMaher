"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ThemePalette } from "./ThemeSelector";

interface ColorPickerProps {
  onSave: (theme: ThemePalette) => void;
  onCancel: () => void;
}

const colorPairs = [
  { primary: "#3b82f6", secondary: "#1e40af", accent: "#0284c7", name: "Blue" },
  { primary: "#ec4899", secondary: "#be185d", accent: "#db2777", name: "Pink" },
  {
    primary: "#8b5cf6",
    secondary: "#6d28d9",
    accent: "#7c3aed",
    name: "Purple",
  },
  {
    primary: "#f59e0b",
    secondary: "#d97706",
    accent: "#f97316",
    name: "Amber",
  },
  { primary: "#10b981", secondary: "#059669", accent: "#14b8a6", name: "Teal" },
  { primary: "#ef4444", secondary: "#dc2626", accent: "#f87171", name: "Red" },
];

export function ColorPicker({ onSave, onCancel }: ColorPickerProps) {
  const [themeName, setThemeName] = useState("");
  const [selectedPrimary, setSelectedPrimary] = useState("#3b82f6");
  const [selectedSecondary, setSelectedSecondary] = useState("#1e40af");
  const [selectedAccent, setSelectedAccent] = useState("#0284c7");

  const handleSave = () => {
    if (!themeName.trim()) return;

    const newTheme: ThemePalette = {
      id: `custom-${Date.now()}`,
      name: themeName,
    };

    onSave(newTheme);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Create Custom Theme
          </h3>

          {/* Theme name input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Theme Name
            </label>
            <input
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              placeholder="e.g., My Awesome Theme"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Color picker grid */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-4">
              Select Color Pair
            </label>
            <div className="grid grid-cols-2 gap-3">
              {colorPairs.map((pair) => (
                <motion.button
                  key={pair.name}
                  onClick={() => {
                    setSelectedPrimary(pair.primary);
                    setSelectedSecondary(pair.secondary);
                    setSelectedAccent(pair.accent);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPrimary === pair.primary
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex gap-1 mb-2">
                    <div
                      className="flex-1 h-6 rounded-sm"
                      style={{ backgroundColor: pair.primary }}
                    />
                    <div
                      className="flex-1 h-6 rounded-sm"
                      style={{ backgroundColor: pair.secondary }}
                    />
                    <div
                      className="flex-1 h-6 rounded-sm"
                      style={{ backgroundColor: pair.accent }}
                    />
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    {pair.name}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6 p-4 bg-background rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-3">Preview</p>
            <div className="flex gap-2">
              <motion.div
                className="flex-1 h-8 rounded-md"
                style={{ backgroundColor: selectedPrimary }}
                layoutId="custom-primary"
              />
              <motion.div
                className="flex-1 h-8 rounded-md"
                style={{ backgroundColor: selectedSecondary }}
                layoutId="custom-secondary"
              />
              <motion.div
                className="flex-1 h-8 rounded-md"
                style={{ backgroundColor: selectedAccent }}
                layoutId="custom-accent"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleSave}
              disabled={!themeName.trim()}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Theme
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
