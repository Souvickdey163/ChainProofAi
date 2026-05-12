import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getTrustScoreState(score) {
  if (score >= 80) {
    return {
      label: "Verified",
      ring: "border-emerald-400/30",
      glow: "shadow-[0_0_40px_rgba(74,222,128,0.28)]",
      text: "text-emerald-300",
      progress: "from-emerald-300 to-cyan-300",
      surface: "bg-emerald-400/10"
    };
  }

  if (score >= 50) {
    return {
      label: "Review",
      ring: "border-amber-300/30",
      glow: "shadow-[0_0_40px_rgba(251,191,36,0.28)]",
      text: "text-amber-300",
      progress: "from-amber-300 to-yellow-200",
      surface: "bg-amber-400/10"
    };
  }

  return {
    label: "Tampered",
    ring: "border-rose-400/30",
    glow: "shadow-[0_0_40px_rgba(251,113,133,0.28)]",
    text: "text-rose-300",
    progress: "from-rose-400 to-red-500",
    surface: "bg-rose-500/10"
  };
}
