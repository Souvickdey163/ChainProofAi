import { GlassCard } from "@/components/ui/GlassCard";
import { TrustWave } from "@/components/animations/TrustWave";

export function TrustGraph({ analysis }) {
  const regionCount = analysis?.analysis?.suspiciousRegions?.length ?? 0;

  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Trust Graph</p>
      <p className="mt-3 text-sm text-slate-400">
        Confidence: {analysis?.aiConfidence}% • Suspicious regions: {regionCount}
      </p>
      <div className="mt-6">
        <TrustWave />
      </div>
    </GlassCard>
  );
}
