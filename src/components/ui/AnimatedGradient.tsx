
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-r from-insura-blue/10 via-insura-teal/10 to-insura-blue/10 bg-[size:400%] animate-gradient-shift opacity-70 -z-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export const GradientBlur = () => {
  return (
    <>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-insura-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-insura-teal/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow delay-1000" />
    </>
  );
};
