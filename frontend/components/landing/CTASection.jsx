import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";

export function CTASection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <GlassCard className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Deploy Trust</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Run your first verification flow in minutes.</h3>
        </div>
        <GlowButton href="/upload">Open Verification Console</GlowButton>
      </GlassCard>
    </section>
  );
}
