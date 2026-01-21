"use client";
import { Project } from "@/types";
import React from "react";

import { client } from "@/lib/sanity";
import { useLocale, useTranslations } from "next-intl";
import { urlFor } from "@/lib/utils";
import { ProjectCard as ProductCardv1 } from "./ProductCard";
import { Button } from "./ui/button";
import { PRODUCT_PER_PAGE } from "@/constants/products";
import { query } from "./Projects";

const MoreProject = () => {
  const t = useTranslations();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [products, setProducts] = React.useState<Project[]>([]);
  const { start, end } = React.useMemo(() => {
    const start = page * PRODUCT_PER_PAGE;
    const end = page * PRODUCT_PER_PAGE + PRODUCT_PER_PAGE;
    return {
      start,
      end,
    };
  }, [page]);
  const locale = useLocale();
  const next = async () => {
    try {
      setLoading(true);
      const data: { items: Project[]; total: number } = await client.fetch(
        query,
        { locale, start, end },
        { cache: "force-cache" },
      );
      setProducts((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (data.items.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {products.map((p) => {
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
      <Button
        onClick={next}
        variant={"ghost"}
        hidden={!hasMore || loading}
        className="w-fit mx-auto cursor-pointer capitalize"
        size={"sm"}
      >
        {t("viewMore")}
      </Button>
      <span
        hidden={hasMore}
        className=" text-muted-foreground text-center mx-auto block"
      >
        {t("noMore")}
      </span>
      {/* <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
        </InfiniteScroll> */}
    </>
  );
};

export default MoreProject;
