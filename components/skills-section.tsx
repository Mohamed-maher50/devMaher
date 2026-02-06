"use client";

import { SKILLS } from "@/constants";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ScrollElementProvider from "./ScrollElementProvider";

export function SkillsSection() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: i * 0.12,
        ease: [0.23, 1, 0.32, 1], // custom easeOutQuart
      },
    }),
  };

  const skillItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      x: 8,
      transition: { duration: 0.2 },
    },
  };

  const progressVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: (level: number) => ({
      scaleX: level / 100,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scaleX: 1,
    },
  };
  return (
    <ScrollElementProvider name="skills">
      <motion.section
        className="min-h-screen py-20 "
        variants={containerVariants}
        initial="hidden"
        id="skills"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl rtl:font-cairo font-sora md:text-5xl font-bold text-center mb-16 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("skills:title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((skillGroup, categoryIdx) => (
              <motion.div
                key={skillGroup.localeCategory}
                className="space-y-6 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors "
                custom={categoryIdx}
                variants={categoryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                onMouseEnter={() =>
                  setActiveCategory(skillGroup.localeCategory)
                }
                onMouseLeave={() => setActiveCategory(null)}
              >
                <motion.div
                  className="relative"
                  initial={false}
                  animate={{
                    scale:
                      activeCategory === skillGroup.localeCategory ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <h3 className="text-lg font-sora capitalize rtl:font-cairo font-bold text-primary">
                    {/* {skillGroup.localeCategory} */}
                    {t(skillGroup.localeCategory)}
                  </h3>
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        activeCategory === skillGroup.localeCategory
                          ? "100%"
                          : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <div className="space-y-4">
                  {skillGroup.items.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      custom={skillIdx}
                      variants={skillItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between">
                        <motion.span className="text-sm font-medium text-foreground/90">
                          {skill.name}
                        </motion.span>
                        <motion.span
                          className="text-xs text-primary/70 font-semibold"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.4 + skillIdx * 0.08 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-linear-to-r from-primary to-accent"
                          custom={skill.level}
                          variants={progressVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          style={{ originX: 0 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="flex gap-1 pt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {skillGroup.items.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-primary/40"
                      animate={{
                        scale:
                          activeCategory === skillGroup.localeCategory
                            ? 1.3
                            : 1,
                        opacity:
                          activeCategory === skillGroup.localeCategory
                            ? 1
                            : 0.4,
                      }}
                      transition={{ delay: idx * 0.05 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </ScrollElementProvider>
  );
}
