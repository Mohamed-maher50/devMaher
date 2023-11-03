import React from "react";
import CircleImage from "../CircleImage";
import { motion } from "framer-motion";
const variantsContainer = {
  down: {
    start: {
      y: -200,
    },
    end: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  },
  up: {
    start: {
      y: 1000,
    },
    end: {
      y: 0,
      transition: {
        delay: 0.3,
        ease: "easeInOut",
        type: "spring",
        stiffness: 40,
      },
    },
  },
};
const Header = () => {
  return (
    <div className="container mx-auto py-16 overflow-hidden capitalize">
      <div className="grid grid-cols-3 text-center lg:text-start  gap-4 ">
        <motion.strong
          variants={variantsContainer.down}
          initial="start"
          animate="end"
          className="text-5xl md:col-span-1  pt-10 md:col-start-1 md:col-end-2  text-accent font-semibold col-span-3 lg:col-span-2 "
        >
          Hi my name is mohamed maher
        </motion.strong>
        <motion.p
          variants={variantsContainer.up}
          initial="start"
          animate="end"
          className="text-secondary opacity-70 font-s text-sm  col-span-3 lg:col-span-2  lg:row-start-2 lg:row-end-3"
        >
          As an experienced MERN stack web developer with 4 years of expertise
          in React, TailwindCSS, REST API development, Responsive Design,
          TypeScript, Bootstrap, and Redux Context API. I also have extensive
          experience working with MongoDB, Express.js, React.js, and Node.js
          (MERN stack). I am well-versed in building dynamic and user-friendly
          web applications. With proficiency in server-side development using
          Node.js and Express.js along with the use of MongoDB as a NoSQL
          database. In addition to my technical skills, I have knowledge of
          Socket.io which enables real-time communication between clients and
          servers using WebSockets. I am always eager to learn new technologies
          and tools that can enhance my skillset. My passion for problem-solving
          combined with dedication to continuous learning allows me to deliver
          high-quality solutions that meet client requirements. Thank you for
          considering my qualifications.
        </motion.p>
        <div className=" col-span-3  row-start-1 lg:row-start-auto lg:row-span-2 md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-3 lg:pt-20">
          <CircleImage customStyle={` mx-auto `} />
        </div>
      </div>
    </div>
  );
};

export default Header;
