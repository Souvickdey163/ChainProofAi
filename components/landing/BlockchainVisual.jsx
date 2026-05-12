import { GlassCard } from "@/components/ui/GlassCard";
import { TrustWave } from "@/components/animations/TrustWave";

export function BlockchainVisual() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
        <GlassCard>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">AI + Blockchain Pipeline</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["Upload", "Analyze", "Fingerprint", "Anchor"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">0{index + 1}</p>
                <p className="mt-3 text-lg font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Trust Momentum</p>
          <div className="mt-6">
            <TrustWave />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
