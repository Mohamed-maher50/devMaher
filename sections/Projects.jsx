import React from "react";
import { useTranslation } from "react-i18next";

import SubTitleWithProgress from "../components/SubTitleWithProgress";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "../components/ProjectCard";
const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.data", {
    returnObjects: true,
  });
  const ProjectsContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ProjectsContainerRef,
    offset: ["start", "end end"],
  });

  return (
    <section
      className=" md:snap-mandatory md:snap-y"
      ref={ProjectsContainerRef}
    >
      <SubTitleWithProgress
        scrollYProgress={scrollYProgress}
        subtitle={t("projects.subtitle")}
      />
      <div className="grid gap-40 mt-5 min-h-screen container mx-auto ">
        {projects.map((project, index) => {
          return <ProjectCard {...project} key={index} demoText={t("demo")} />;
        })}
      </div>
    </section>
  );
};

export default Projects;
