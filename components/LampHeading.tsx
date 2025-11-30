import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
const HeadingLamp = async () => {
  const t = await getTranslations();
  return (
    <div className="  pointer-events-none ">
      <motion.div
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="origin-top  relative not-dark:transform-none! flex flex-col items-center"
      >
        {/* The Cord */}
        <div className="h-20 w-0.5 bg-linear-to-b from-border to-zinc-800 dark:to-zinc-400" />

        {/* The Shade */}
        <div className="relative  ">
          {/* Fixture top */}
          <div className="w-4 h-2 bg-zinc-600 mx-auto" />
          {/* Main Shade */}
          <div className="w-24 h-12 bg-linear-to-b from-zinc-800 to-zinc-950 rounded-t-[40px] rounded-b-lg shadow-xl relative z-20 ring-1 ring-white/10">
            {/* Inner reflection */}
            <div className="absolute bottom-0 inset-x-2 h-1 bg-yellow-100/20 rounded-full blur-[1px]" />
          </div>

          {/* The Bulb (Visible glowing source) */}
          <div className="absolute  -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-200 rounded-full blur-sm z-10 opacity-90 animate-pulse" />
        </div>

        {/* The Light Beam / Cone */}
        <div
          className="w-[400px]  hidden dark:block absolute top-full h-[300px] -mt-4 z-0 origin-top opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(253, 224, 71, 0.25) 0%, rgba(253, 224, 71, 0.05) 40%, transparent 70%)",
            clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0% 100%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
      <div className="mt-10 rtl:font-cairo capitalize font-sora mx-auto w-fit text-secondary-foreground/90  text-4xl font-bold">
        {t("project:title")}
      </div>
    </div>
  );
};
export default HeadingLamp;
