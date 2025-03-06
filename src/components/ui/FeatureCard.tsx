
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ChipBadge } from "./ChipBadge";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  chip?: string;
  chipVariant?: "default" | "outline" | "secondary" | "accent";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  chip,
  chipVariant = "default",
}) => {
  return (
    <div
      className={cn(
        "premium-card p-6 transition-all duration-300 hover:shadow-lg group",
        className
      )}
    >
      <div className="mb-4 relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-insura-blue/10 to-insura-teal/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon
            className="w-6 h-6 text-insura-blue group-hover:text-insura-teal transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        {chip && <ChipBadge variant={chipVariant}>{chip}</ChipBadge>}
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
