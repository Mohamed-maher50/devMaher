"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  techStack: string[];
}

export function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  link,
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
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.8, 1],
    [0, 1, 0.4, 0]
  );
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
    <div
      ref={ref}
      className="max-sm:my-10 h-fit  sm:h-[200vh]  relative isolate"
    >
      <motion.div
        style={{ y: translateY, scale, boxShadow: shadow }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="group sticky  not-sm:transform-none!   top-1/2 -translate-y-1/2  flex flex-col overflow-hidden rounded-xl  hover:shadow-2xl"
      >
        <div className="relative min-h-72 h-full w-full overflow-hidden bg-muted sm:h-52  md:h-128">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover "
          />

          {/* Overlay Gradient - darker and more prominent */}
          <motion.div
            className="
          absolute inset-0 
          bg-black/40
          bg-radial
          from-black/55
          to-white/10
       
          
          
        "
          />

          <div className="absolute   inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="text-3xl rtl:font-cairo font-sora capitalize font-bold text-white sm:text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-105 text-balance leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              className="mt-4 text-sm rtl:font-Tajawal font-inter text-white/90 sm:text-base md:text-lg leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>

            <Button
              variant="outline"
              size="lg"
              className="mt-6 font-sora rtl:font-cairo cursor-pointer rounded-full "
              asChild
            >
              <Link href={link} target="_blank">
                {t("demo")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
