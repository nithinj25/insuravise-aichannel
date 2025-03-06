
import { cn } from "@/lib/utils";

interface ChipBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "accent";
  className?: string;
}

export const ChipBadge = ({
  children,
  variant = "default",
  className,
}: ChipBadgeProps) => {
  const variants = {
    default:
      "bg-insura-blue/10 text-insura-blue border-insura-blue/20",
    outline:
      "bg-transparent border-insura-blue/20 text-insura-blue",
    secondary:
      "bg-insura-gray border-insura-gray/50 text-insura-darkgray",
    accent:
      "bg-insura-teal/10 text-insura-teal border-insura-teal/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
