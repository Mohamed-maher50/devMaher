import { HeroSection } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SkillsSection } from "@/components/skills-section";
import { ThemeSelector } from "@/components/ThemeSelector";
import { UserProfile } from "@/types";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Cpu, FolderKanban, HomeIcon, Mail } from "lucide-react";
import TabletMockup from "@/components/TabletMockup";
import Projects from "@/components/Projects";
import { supportedLanguages } from "@/constants/locales";
import ScrollElementProvider from "@/components/ScrollElementProvider";
import { ContactSection } from "@/components/ContactSection";
import { ProjectCard } from "@/components/project-card";

const navbarLinks = [
  {
    Icon: <HomeIcon />,
    id: "",
    label: "home",
    labelKey: "sections.home",
  },
  {
    Icon: <Cpu />,
    id: "skills",
    label: "Skills",
    labelKey: "sections.skills",
  },
  {
    Icon: <FolderKanban />,
    id: "projects",
    label: "Projects",
    labelKey: "sections.projects",
  },
];
export default async function Home({
  params,
}: {
  params: Promise<{ locale: supportedLanguages }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const profile: UserProfile = t.raw("profile");
  return (
    <div className="flex flex-col gap-y-10">
      <Navbar activeSection="overflow" navLinks={navbarLinks} />
      <div className="px-4 lg:px-16 xl:px-28  mx-auto">
        <ScrollElementProvider name="">
          <Suspense fallback={<div>Loading Hero...</div>}>
            <HeroSection profile={profile} />
          </Suspense>
        </ScrollElementProvider>
        <SkillsSection />
        <TabletMockup />

        <Suspense fallback={<div>Loading Projects...</div>}>
          <Projects locale={locale} />
        </Suspense>
        <ThemeSelector />
        <ContactSection />
      </div>
    </div>
  );
}
