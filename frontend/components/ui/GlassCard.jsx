import { cn } from "@/lib/helpers";

export function GlassCard({ className, children }) {
  return <div className={cn("glass-card rounded-[28px] p-6", className)}>{children}</div>;
}
