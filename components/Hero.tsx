import React from "react";
import * as motion from "motion/react-client";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Download,
} from "lucide-react";
import { UserProfile } from "@/types";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Hero from "@/assets/images/hero.webp";
import NetworkBackground from "./NetworkAnimation";
interface HeroSectionProps {
  profile: UserProfile;
}

export const HeroSection: React.FC<HeroSectionProps> = async ({ profile }) => {
  const t = await getTranslations();
  const header = t("skills:title");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mb-8"
    >
      <div className="relative h-48 sm:h-52 overflow-hidden border-b border-border/50">
        <NetworkBackground />
      </div>

      <div className="px-6 sm:px-10 pb-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start -mt-20 sm:-mt-24 relative z-10">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="shrink-0"
          >
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-background bg-zinc-200 overflow-hidden shadow-xl">
              <Image
                src={Hero}
                width={230}
                height={257}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="grow pt-4 md:pt-24 space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl rtl:font-cairo font-sora sm:text-4xl font-bold text-foreground tracking-tight"
                >
                  {profile.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl rtl:font-cairo font-sora text-primary font-medium mt-1"
                >
                  {profile.title}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3"
              >
                <button
                  aria-label="download_button"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  {/* <span>{t.downloadCv}</span> */}
                </button>
                <button
                  aria-label="send email button"
                  className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2 border border-border"
                >
                  <Mail className="w-4 h-4" />
                  {/* <span>{t.contactBtn}</span> */}
                </button>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground font-inter max-w-2xl leading-relaxed"
            >
              {profile.bio}
            </motion.p>

            {/* Info & Socials Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary/70" />
                {profile.location}
              </div>
              <div className="h-4 w-px bg-border hidden sm:block"></div>
              <div className="flex items-center gap-4">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-secondary rounded-full"
                  aria-label=" github profile link"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin profile link"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-secondary rounded-full"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="twitter profile link"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-secondary rounded-full"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
