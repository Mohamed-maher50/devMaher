"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastY = 0;

    return scrollY.on("change", (y) => {
      if (y > lastY) {
        // scrolling down → show bar
        setShow(true);
      } else {
        // scrolling up → hide bar
        setShow(false);
      }
      lastY = y;
    });
  }, [scrollY]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-1 bg-primary origin-left z-30"
      style={{
        scaleX,
        translateY: show ? "0%" : "150%", // slide down to hide
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    />
  );
}
