import * as motion from "motion/react-client";

export default function LabeledLight() {
  return (
    <div className="flex items-center space-x-2">
      {/* المصباح */}
      <motion.div
        className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg"
        animate={{
          scale: [1, 1.5, 1], // نبضة
          boxShadow: ["0 0 5px #FFD700", "0 0 15px #FFD700", "0 0 5px #FFD700"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
        }}
      />

      {/* النص */}
      <span className="text-white font-semibold">Label</span>
    </div>
  );
}
