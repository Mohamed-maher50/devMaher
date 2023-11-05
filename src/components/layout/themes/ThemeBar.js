import React, { useEffect, useRef, useState } from "react";
import Theme from "../../Theme";
import { FiChevronDown } from "react-icons/fi";
import {
  motion,
  AnimatePresence,
  useAnimate,
  useAnimation,
} from "framer-motion";
const themes = {
  light: {
    primary: "#F3F0CA",
    secondary: "#192655",
    accent: "#3876bf",
    sub: "#e1aa74",
  },
  dark: {
    primary: "#1A120B",
    secondary: "#D5CEA3",
    accent: "#D5CEA3",
    sub: "#E5E5CB",
  },
  natural: {
    primary: "#3C6255",
    secondary: "#EAE7B1",
    accent: "#A6BB8D", //61876E
    sub: "#61876E",
  },
  CoolTonesPalette: {
    primary: "#F1F6F9",
    secondary: "#394867",
    accent: "#212A3E", //61876E
    sub: "#9BA4B5",
  },
};
const variantsContainer = {
  down: {
    start: {
      y: "-90%",
    },
    end: {
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 200,
      },
    },
  },
  dragIcon: {
    start: {
      opacity: 0.9,
      scale: 0.8,
    },
    end: {
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
  },
};
const ThemeBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const themeContainer = useRef();
  const handleOnClick = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsActive(false);
  };
  useEffect(() => {
    themeContainer.current &&
      setContainerWidth(themeContainer.current.scrollWidth);
  }, [themeContainer.current]);
  return (
    <motion.div className="fixed top-0 right-0 left-0">
      <AnimatePresence>
        <motion.div
          layout
          initial="start"
          animate="end"
          variants={variantsContainer.down}
          exit={{
            y: "-90%",
          }}
          ref={themeContainer}
          className="bg-gray-100 overflow-hidden mx-auto  shadow-sm rounded-b-3xl  flex"
        >
          {isActive && (
            <motion.div
              drag="x"
              dragConstraints={{
                right: 0,
                left: -containerWidth,
              }}
              className="flex mx-auto gap-2 my-3 justify-around px-2"
            >
              {Object.entries(themes).map(([name, colors], index) => {
                return (
                  <Theme
                    onClick={() => handleOnClick(name)}
                    colors={Object.values(colors)}
                    name={name}
                    key={index}
                  />
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.span
        onClick={() => setIsActive(!isActive)}
        initial="start"
        variants={variantsContainer.dragIcon}
        whileHover={{
          opacity: 1,
          translateY: isActive ? "-5px" : "5px",
          scale: 1,
        }}
        style={{
          rotate: isActive ? "180deg" : "0deg",
        }}
        className="font-bold text-lg duration-200 shadow-md mt-2 bg-secondary text-primary mx-auto w-fit block rounded-full  cursor-pointer"
      >
        <FiChevronDown className="text-3xl" />
      </motion.span>
    </motion.div>
  );
};

export default ThemeBar;
