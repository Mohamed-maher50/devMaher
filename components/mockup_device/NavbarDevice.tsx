"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Layout,
  Shield,
  Globe,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: {
    title: string;
    href: string;
    description: string;
    icon?: React.ReactNode;
  }[];
}

const navItems: NavItem[] = [
  {
    name: "Products",
    href: "#products",
    children: [
      {
        title: "Analytics",
        href: "#analytics",
        description: "Get detailed insights into your data usage.",
        icon: <Layout className="w-5 h-5 text-indigo-500" />,
      },
      {
        title: "Security",
        href: "#security",
        description: "Advanced protection for your critical infrastructure.",
        icon: <Shield className="w-5 h-5 text-emerald-500" />,
      },
      {
        title: "Global CDN",
        href: "#cdn",
        description: "Lightning fast content delivery worldwide.",
        icon: <Globe className="w-5 h-5 text-blue-500" />,
      },
      {
        title: "Integrations",
        href: "#integrations",
        description: "Connect with over 100+ third-party tools.",
        icon: <Zap className="w-5 h-5 text-amber-500" />,
      },
    ],
  },
  { name: "Customers", href: "#customers" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
];

export const TabletMockupNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "relative top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b w-full",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-border py-3"
            : "bg-background/60 backdrop-blur-sm border-transparent py-4"
        )}
      >
        <div className="w-full px-6 md:px-12">
          <nav className="flex items-center justify-between relative">
            <div className="flex items-center gap-2 font-bold text-xl cursor-pointer select-none">
              <div className="w-9 h-9 bg-foreground text-background rounded-md flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="hidden sm:inline-block tracking-tight text-foreground">
                Acme Inc.
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative group px-1"
                    onMouseEnter={() => setHoveredTab(item.name)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    <a
                      href={item.href}
                      className={cn(
                        "relative z-10 block px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        hoveredTab === item.name
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1">
                        {item.name}
                        {item.children && (
                          <ChevronDown
                            className={cn(
                              "w-3 h-3 transition-transform duration-200",
                              hoveredTab === item.name ? "rotate-180" : ""
                            )}
                          />
                        )}
                      </span>
                    </a>

                    {/* Animated Background Pill */}
                    {hoveredTab === item.name && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-accent rounded-md"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.5,
                        }}
                        style={{ zIndex: 0 }}
                      />
                    )}

                    {/* Mega Menu Dropdown */}
                    {item.children && hoveredTab === item.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]">
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden p-1"
                        >
                          <div className="grid grid-cols-2 gap-1 p-1">
                            {item.children.map((child) => (
                              <a
                                key={child.title}
                                href={child.href}
                                className="flex items-start gap-3 p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group/item"
                              >
                                <div className="mt-0.5 p-2 bg-muted/50 rounded-md group-hover/item:bg-background transition-colors">
                                  {child.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-medium leading-none mb-1.5 text-foreground">
                                    {child.title}
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-snug">
                                    {child.description}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="bg-muted/30 m-1 p-3 rounded-md text-xs text-muted-foreground flex justify-between items-center">
                            <span>Enterprise solutions available.</span>
                            <span className="text-foreground font-medium cursor-pointer hover:underline">
                              Contact Sales →
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Actions - No Primary Buttons / Skeleton Style */}
            <div className="hidden md:flex items-center gap-3">
              {/* Outline / Skeleton style button */}
              <button className="group relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-2 text-foreground"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute inset-x-0 top-[65px] z-40 bg-background border-b border-border md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-3">
                  <a
                    href={item.href}
                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="pl-4 space-y-3 border-l border-border ml-1">
                      {item.children.map((child) => (
                        <a
                          key={child.title}
                          href={child.href}
                          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-1"
                        >
                          {child.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <hr className="border-border" />
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm">
                  Log in
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm">
                  Sign up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
