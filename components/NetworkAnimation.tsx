import React from "react";

const NetworkBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 bg-primary text-primary-foreground
    
    
    
    q
    "
    >
      {/* Static Grid Pattern using CSS Gradients (Graph paper effect) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle radial gradient overlay for professional lighting/depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Fade to bottom to blend smoothly */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
    </div>
  );
};

export default NetworkBackground;
