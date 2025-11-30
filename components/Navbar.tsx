"use client";
import React, { JSX, useEffect, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "../lib/utils";
import { DarkModeToggle } from "./DarkModeTaggle";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Link as ScrollLink } from "react-scroll";
import { useParams } from "next/navigation";
export interface NavLink {
  id: string;
  label: string;
  Icon: JSX.Element;
  labelKey: string;
}

interface NavbarProps {
  activeSection: string;
  navLinks: NavLink[];
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, navLinks }) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const t = useTranslations("nav");
  const [activeLink, setActiveLink] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsHeaderHidden(true);
    } else {
      setIsHeaderHidden(false);
    }
  });
  // const click = (sectionId: string) => {
  //   setActiveLink(sectionId);
  //   const ele = document.getElementById(sectionId);
  //   if (!ele) return window.scrollTo({ top: 0, behavior: "smooth" });
  //   ele?.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <motion.header
      dir="ltr"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHeaderHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="bg-background/95  border-b border-border sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <span className="font-semibold text-lg tracking-tight hidden sm:block group-hover:text-primary transition-colors">
            MotionForge
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              return (
                <Button
                  key={link.id}
                  variant={activeLink === link.id ? "secondary" : "ghost"}
                  // onClick={() => scrollToSection(link.id)}
                  asChild
                  className={cn(
                    "transition-all rtl:font-cairo cursor-pointer",
                    activeLink == link.id.toLowerCase()
                      ? "bg-primary/10 font-sora text-primary hover:bg-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ScrollLink
                    to={link.id}
                    smooth
                    onSetActive={(props, ele) => {
                      setActiveLink(props);
                    }}
                    spy
                  >
                    {t(link.labelKey)}
                  </ScrollLink>
                </Button>
              );
            })}
          </nav>
          <div className="h-6 w-px bg-border hidden md:block"></div>

          <LanguageSwitcher />
          <DarkModeToggle />

          <Button
            asChild
            className="cursor-pointer rtl:font-cairo font-sora xs:inline-flex shadow-sm"
          >
            <ScrollLink to="contact">{t("sections.contact")}</ScrollLink>
          </Button>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />
    </motion.header>
  );
};
