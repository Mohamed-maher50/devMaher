import * as motion from "motion/react-client";
import {
  Code2,
  Database,
  GitBranch,
  Package,
  Palette,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import TechStackCardSmall from "./TechStackCardSmall";
// import { Variants } from "framer-motion";
const smallTechStack = [
  {
    name: "React",
    icon: <Code2 className="w-4 h-4" />,
    color: "cyan" as const,
  },
  {
    name: "TypeScript",
    icon: <Terminal className="w-4 h-4" />,
    color: "blue" as const,
  },
  {
    name: "Next.js",
    icon: <Zap className="w-4 h-4" />,
    color: "gray" as const,
  },
  {
    name: "Tailwind CSS",
    icon: <Palette className="w-4 h-4" />,
    color: "cyan" as const,
  },
  {
    name: "Node.js",
    icon: <Server className="w-4 h-4" />,
    color: "green" as const,
  },
  {
    name: "PostgreSQL",
    icon: <Database className="w-4 h-4" />,
    color: "blue" as const,
  },
  {
    name: "Git",
    icon: <GitBranch className="w-4 h-4" />,
    color: "orange" as const,
  },
  {
    name: "REST APIs",
    icon: <Package className="w-4 h-4" />,
    color: "purple" as const,
  },
];
// const container: Variants = {
//   hidden: {
//     scale: 0,
//   },
//   show: {
//     scale: 1,
//     transition: {
//       repeat: Infinity,
//       repeatDelay: 5,
//     },
//   },
// };

// const item: Variants = {
//   hidden: { opacity: 0, y: 20, scale: 1 },
//   show: {
//     scale: 1.1,
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.2,
//       ease: "easeOut",
//     },
//   },
// };
const TechStackCardSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
          },
        },
      }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2"
    >
      {smallTechStack.map((tech, index) => (
        <TechStackCardSmall
          animate={{ opacity: 1, scale: 1, x: 0 }}
          initial={{ opacity: 0, scale: 0.5, x: 50 }}
          transition={{
            duration: 2.5,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            // repeatDelay: (array.length - 1 - index) * 0.5,
          }}
          key={index}
          {...tech}
        />
      ))}
    </motion.div>
  );
};

export default TechStackCardSection;
