import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const variantContainer = {
  goDown: {
    start: (index) => {
      return {
        y: 100,
        opacity: 0,
        scale: 0,
        transition: {
          duration: 2,
        },
      };
    },
    end: (index) => {
      return {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.1 * index,
        },
      };
    },
  },
};
const Skill = ({ skill, icon, customStyle, index }) => {
  const { ref, inView } = useInView();

  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start((index) => {
        return {
          y: 0,
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.1 * index,
            duration: 0.5,
            ease: "easeInOut",
          },
        };
      });
    }
  }, [inView]);
  return (
    <motion.div
      layout
      variants={variantContainer.goDown}
      initial="start"
      custom={index}
      animate={controls}
      ref={ref}
      className={`p-2 bg-secondary overflow-hidden relative font-semibold shadow-inner text-primary rounded-lg ${customStyle}`}
    >
      <div className="text-3xl block w-fit mx-auto">{icon}</div>
      <h1 className="text-sm  w-fit mx-auto">{skill}</h1>
    </motion.div>
  );
};

export default Skill;
