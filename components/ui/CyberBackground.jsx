import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { MatrixRain } from "@/components/animations/MatrixRain";

export function CyberBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(81,199,255,0.18),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(123,97,255,0.16),transparent_25%),linear-gradient(180deg,#04050a_0%,#07101f_100%)]" />
      <AnimatedGrid />
      <ParticleBackground />
      <MatrixRain />
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
    </div>
  );
}
