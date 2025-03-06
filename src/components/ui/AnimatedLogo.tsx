
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 bg-gradient-to-tr from-insura-blue to-insura-teal rounded-lg animate-pulse-slow" />
      <div className="absolute inset-0.5 bg-white rounded-[7px] flex items-center justify-center">
        <span className="font-semibold bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
          AI
        </span>
      </div>
    </div>
  );
};
