import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";
import { SuspenseProjectSkeletons } from "@/components/ProjectSkeleton";
import ScrollElementProvider from "@/components/ScrollElementProvider";
import TabletMockup from "@/components/TabletMockup";
import TechStackCardSection from "@/components/TechStackCardSection";
import { locales, supportedLanguages } from "@/constants/locales";
import { UserProfile } from "@/types";
import { Cpu, FolderKanban, HomeIcon } from "lucide-react";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Head from "next/head";
import { Suspense } from "react";
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
type MetadataProps = {
  locale: supportedLanguages;
};
export const dynamic = "force-static";
export async function generateMetadata({}: {
  params: Promise<MetadataProps>;
}): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("title"),
    description: t("desc"),
    manifest: "/manifest.json",
    icons: {
      icon: [
        {
          rel: "icon",
          url: "/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          rel: "icon",
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          rel: "apple-touch-icon",
        },
      ],
      shortcut: ["/favicon.ico"],
    },

    openGraph: {
      title: t("title"),
      description: t("desc"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: `https://ogcdn.net/74914e2a-cefe-4248-a5ed-415339b285c1/v2/Front%20End%20Developer%20/Mohamed%20Maher/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F9430641d-dcd9-4862-9e60-893ba3f4c933.png%3Ftoken%3DFh-2v3FHDStzV8Mc2clJsY_GL0e0uJy9U4jEjWgQ8Cg%26height%3D1200%26width%3D1200%26expires%3D33306461063/%23000000/og.png`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}
export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale }));
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: supportedLanguages }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const profile: UserProfile = t.raw("profile");
  return (
    <div key={locale} className="flex flex-col gap-y-10 ">
      <Head>
        <meta name="apple-mobile-web-app-title" content="DevMaher" />
      </Head>
      <Navbar activeSection="overflow" navLinks={navbarLinks} />
      <div className="px-4 lg:px-16 xl:px-28 isolate mx-auto">
        <ScrollElementProvider name="">
          <HeroSection profile={profile} />
        </ScrollElementProvider>

        {/* Tech Stack Grid - Small Cards */}
        <ScrollElementProvider name="skills">
          <div className="my-24">
            <motion.h2
              className="text-4xl rtl:font-cairo font-sora md:text-5xl font-bold text-center mb-16 text-balance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t("skills:title")}
            </motion.h2>

            <TechStackCardSection />
          </div>
        </ScrollElementProvider>
        {/* <SkillsSection /> */}
        <TabletMockup />
        {/* <MobileShell /> */}
        <Suspense fallback={<SuspenseProjectSkeletons />}>
          <Projects locale={locale} />
        </Suspense>

        <ScrollElementProvider name="contact">
          <ContactSection />
        </ScrollElementProvider>
      </div>
    </div>
  );
}
