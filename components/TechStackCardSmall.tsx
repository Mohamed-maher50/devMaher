"use client";
import { motion } from "framer-motion";
import type React from "react";
import { Card } from "@/components/ui/card";

interface TechStackCardSmallProps {
  name: string;
  icon?: React.ReactNode;
}

import { forwardRef } from "react";

const TechStackCardSmall = forwardRef<HTMLDivElement, TechStackCardSmallProps>(
  function TechStackCardSmall({ name, icon, ...other }, ref) {
    return (
      <motion.div
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        ref={ref}
        {...other}
      >
        <Card className="group relative overflow-hidden border border-border/50 bg-card/50 hover:bg-card hover:shadow-lg hover:border-border transition-all duration-300">
          <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300" />

          <div className="relative p-3 z-10 flex justify-center items-center gap-2">
            {icon && (
              <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                <div className="w-4 h-4 text-primary">{icon}</div>
              </div>
            )}

            <h3 className="text-sm text-center font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {name}
            </h3>
          </div>
        </Card>
      </motion.div>
    );
  }
);

export default motion.create(TechStackCardSmall);
