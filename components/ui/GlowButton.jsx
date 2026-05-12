import Link from "next/link";
import { cn } from "@/lib/helpers";

export function GlowButton({ href, className, children }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-glow transition hover:scale-[1.02] hover:bg-cyan-200",
        className
      )}
    >
      {children}
    </Link>
  );
}
