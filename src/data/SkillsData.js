import { AiFillGithub, AiOutlineHtml5 } from "react-icons/ai";
import { FaBootstrap, FaCss3, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiMongodb,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

export const Skills = [
  {
    skill: "Html",
    icon: <AiOutlineHtml5 />,
  },
  {
    skill: "Css",
    icon: <FaCss3 />,
  },
  {
    skill: "tailwindCss",
    icon: <SiTailwindcss />,
  },

  {
    skill: "React",
    icon: <FaReact />,
  },
  {
    skill: "NodeJs",
    icon: <FaNodeJs />,
  },
  {
    skill: "Redux",
    icon: <SiRedux />,
  },
  {
    skill: "Bootstrap",
    icon: <FaBootstrap />,
  },
  {
    skill: "Typescript",
    icon: <SiTypescript />,
  },
  {
    skill: "Github",
    icon: <AiFillGithub />,
  },
  {
    skill: "Nextjs",
    icon: <TbBrandNextjs />,
    external: false,
  },
  {
    skill: "Photoshop",
    icon: <SiAdobephotoshop />,
    external: true,
  },
  {
    skill: "Mongodb",
    icon: <SiMongodb />,
    external: true,
  },
];
