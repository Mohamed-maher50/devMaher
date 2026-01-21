import { supportedLanguages } from "@/constants/locales";
import { client } from "@/lib/sanity";
import { Project } from "@/types";
import { urlFor } from "@/lib/utils";
import HeadingLamp from "./LampHeading";
import ScrollElementProvider from "./ScrollElementProvider";
import { ProjectCard as ProductCardv1 } from "./ProductCard";
import MoreProject from "./MoreProject";
import { PRODUCT_PER_PAGE } from "@/constants/products";
export const query = `
{
  "items": *[_type == "projects"]
    | order(viewOrder desc)
    [$start...$end]{
      _createdAt,
      "description": description[_key == $locale][0].value,
      "title": coalesce(
        title[_key == $locale][0].value,
        title[_key == "en"][0].value
      ),
      link,
      image,
      _id,
      techStack,
      viewOrder 
    },

  "total": count(*[_type == "projects"])
}
`;
const Projects = async ({ locale }: { locale: supportedLanguages }) => {
  const data: { items: Project[]; total: number } = await client.fetch(
    query,
    { locale, start: 0, end: PRODUCT_PER_PAGE },
    { cache: "force-cache" },
  );

  return (
    <ScrollElementProvider name="projects">
      <section className="flex flex-col my-30">
        <HeadingLamp />
        <div className="pt-44 grid grid-cols-1  gap-5 sm:grid-cols-2 md:grid-cols-1">
          {data.items.map((p) => {
            return (
              <ProductCardv1
                description={p.description}
                image={urlFor(p.image).width(1216).height(512).url()}
                imageAlt={p.title}
                title={p.title}
                link={p.link}
                key={p._id}
                techStack={p.techStack}
              />
            );
          })}
          <MoreProject />
        </div>
      </section>
    </ScrollElementProvider>
  );
};

export default Projects;
