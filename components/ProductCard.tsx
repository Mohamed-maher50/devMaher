"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import { ProjectCardProps } from "./project-card";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
export function ProjectCard({
  title,
  description,
  image,
  link,
  imageAlt = "Project preview",
  techStack,
  //   category = "Development",
  //   tags = [],
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  // scroll progress based on container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
    // start end = يظهر من تحت
    // end start = يختفي لما تطلع فوق
  });

  // animation mapping
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100, 50, -20, -50]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.85]);

  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0px 0px 0px rgba(0,0,0,0.0)",
      "0px 20px 40px rgba(0,0,0,0.25)",
      "0px 5px 15px rgba(0,0,0,0.15)",
    ]
  );
  return (
    <div ref={ref} className="md:h-screen snap-center relative">
      <motion.div
        style={{ y: translateY, scale, boxShadow: shadow }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="group relative sm:max-h-[550px] max-sm:transform-none! snap-center overflow-hidden rounded-2xl max-md:transition-all max-md:duration-700 border border-border/50 bg-card backdrop-blur-sm hover:border-accent hover:shadow-2xl hover:shadow-accent/10 max-md:hover:-translate-y-2"
      >
        {/* Overlay Gradient - darker and more prominent */}
        <motion.div
          className="
          hidden md:block
          absolute inset-0 
          bg-black/50
          bg-radial
          from-black/55
          to-white/5
          z-20          
        "
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 md:hidden bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

        {/* Image container with parallax effect */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
          <div className="absolute md:hidden inset-0  scale-105 bg-linear-to-t  from-black/50 dark:from-card/50 to-transparent z-10 opacity-20 transition-opacity duration-500 group-hover:opacity-100" />
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover transition-all  duration-700 max-md:group-hover:scale-110 max-md:group-hover:rotate-1"
          />

          {/* Category badge */}
          <div className="absolute hidden md:flex top-4 left-4 z-20">
            {/* Tags */}
            {techStack.length > 0 && (
              <div className=" flex flex-wrap gap-2">
                {techStack.map((tag, i) => (
                  <Badge key={i} variant={"default"}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative md:flex z-20 md:items-center md:text-center md:justify-center md:flex-col md:inset-0 md:absolute p-6 space-y-4">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="text-2xl max-md:transform-none! md:text-white md:text-6xl font-bold tracking-tight text-foreground transition-colors duration-300"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            className="text-sm leading-relaxed sm:text-base md:text-lg  rtl:font-Tajawal md:text-white/90 text-muted-foreground line-clamp-4"
          >
            {description}
          </motion.p>

          {/* Tags */}
          {techStack.length > 0 && (
            <div className=" flex md:hidden flex-wrap gap-2">
              {techStack.map((tag, i) => (
                <Badge key={i} variant={"secondary"}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* View Demo Button */}
          <div className="pt-2 ">
            <Button
              asChild
              size={"lg"}
              variant={"outline"}
              className="rounded-full  group/button"
            >
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <span className="capitalize">{t("demo")}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* External link icon */}
          <div className="absolute hidden md:hidden top-6 right-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ExternalLink className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 md:hidden left-0 right-0 h-1 bg-linear-to-r from-accent via-chart-1 to-accent transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      </motion.div>
    </div>
  );
}
