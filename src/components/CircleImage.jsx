import React from "react";
import { motion } from "framer-motion";
const scaleVariant = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { type: "spring", stiffness: 200, delay: 0.2 },
  },
};
const CircleImage = ({ customStyle }) => {
  return (
    <motion.img
      variants={scaleVariant}
      initial="initial"
      animate="animate"
      src="/devMaher/hero.jpg"
      alt="mohamed maher"
      className={`h-64 w-64 border-secondary border-4 rounded-full ml-auto overflow-hidden shadow-xl ${customStyle} `}
    />
  );
};

export default CircleImage;
