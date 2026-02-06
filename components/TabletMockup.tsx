import { ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import { TabletMockupNavbar } from "./mockup_device/NavbarDevice";
import { LimelightNav } from "./ui/shadcn-io/limelight-nav";

function TabletMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "circOut",
      }}
      viewport={{ once: true, amount: 0.5 }}
      exit={{
        y: 500,
      }}
      className="relative isolate mx-auto w-full border-default bg-base border-16 rounded-t-xl md:max-w-10/12"
    >
      <TabletMockupNavbar />
      <section className="relative px-3 pt-4 pb-10 sm:px-4 sm:pt-5 sm:pb-14 md:px-8 md:pt-8 md:pb-20 lg:px-10 lg:pb-24">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[0.7rem] font-medium text-secondary-foreground sm:text-xs md:text-sm"
          >
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
            New v2.0 released
          </motion.div>

          <motion.h1
            className="text-balance text-2xl font-sora font-extrabold tracking-tight text-transparent sm:text-3xl md:text-[2.5rem] lg:text-[3rem] bg-linear-to-r from-foreground to-foreground/60 bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build beautiful interfaces <br className="hidden md:block" />
            <span className="text-foreground">with speed and precision.</span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-6 font-inter max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-8 sm:text-base md:mb-10 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The animated navbar you see above is built with React, Tailwind CSS,
            and Framer Motion. It features a smooth active state pill, dropdown
            animations, and responsive mobile adaptation.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:h-11 sm:w-auto sm:px-6 sm:text-sm md:h-12 md:text-base lg:h-14 lg:px-8">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-full items-center justify-center rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground transition-all hover:border-foreground/20 hover:bg-secondary/60 sm:h-11 sm:w-auto sm:px-6 sm:text-sm md:h-12 md:text-base lg:h-14 lg:px-8">
              View Documentation
            </button>
          </motion.div>
        </div>

        {/* Decorative background grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>
      <div className="mx-auto w-full max-w-4xl px-2 sm:px-6">
        <LimelightNav className="mx-auto flex w-fit my-5 max-w-3xl justify-center" />
      </div>
    </motion.div>
  );
}

export default TabletMockup;
