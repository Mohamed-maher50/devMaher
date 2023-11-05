import React from "react";
import { Skills as SkillsData } from "../../data/SkillsData";
import Skill from "../Skill";
const Skills = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto grid gap-y-11">
        <h1 className="w-fit text-accent mx-auto border-y-4 px-4 border-secondary">
          Skills
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SkillsData.map((sk, index) => (
            <Skill {...sk} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
