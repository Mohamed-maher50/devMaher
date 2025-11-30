import { supportedLanguages } from "@/constants/locales";
import { client } from "@/lib/sanity";
import { Project } from "@/types";
import { urlFor } from "@/lib/utils";
import HeadingLamp from "./LampHeading";
import { Element } from "react-scroll";
import ScrollElementProvider from "./ScrollElementProvider";
import { ProjectCard } from "./project-card";
const query = `

*[_type=="projects"]{
_createdAt,
"description": description[_key == $locale][0].value,
"title":coalesce(
  title[_key == $locale][0].value,
  title[_key == "en"][0].value),
link,
image,
_id
}

`;
const Projects = async ({ locale }: { locale: supportedLanguages }) => {
  const data: Project[] = await client.fetch(query, { locale });
  return (
    <ScrollElementProvider name="projects">
      <section className="flex flex-col my-30">
        <HeadingLamp />
        <div className="pt-44">
          {data.map((p) => {
            return (
              <ProjectCard
                description={p.description}
                image={urlFor(p.image).width(1216).height(512).url()}
                imageAlt={p.title}
                title={p.title}
                link={p.link}
                key={p._id}
              />
            );
          })}
        </div>
      </section>
    </ScrollElementProvider>
  );
};

export default Projects;
