"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen z-50 bg-background items-center justify-center  transition-colors">
      {/* Ambient glow */}
      <div className="absolute inset-0   bg-background" />

      <div className="relative z-10">
        <LogoAnimation />
      </div>
    </div>
  );
}

function LogoAnimation() {
  return (
    <div className="relative h-64 w-64 sm:h-80 sm:w-80">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [0.6, 1, 1, 1, 0.6],
        }}
        transition={{
          duration: 4,
          times: [0, 0.25, 0.6, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MLogoBox />
      </motion.div>
    </div>
  );
}

function MLogoBox() {
  return (
    <motion.div
      className="relative flex bg-primary shadow-primary h-32 w-32 items-center justify-center rounded-2xl inset-shadow-black/30 text-secondary-foreground inset-shadow-sm shadow-xs sm:h-40 sm:w-40"
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* M letter */}
      <div
        className="relative font-inter text-primary-foreground z-10 font-bold "
        style={{ fontSize: "5rem", lineHeight: 1 }}
      >
        M
      </div>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
