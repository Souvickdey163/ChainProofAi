import { getTrustScoreState } from "@/lib/helpers";
import { GlassCard } from "@/components/ui/GlassCard";

export function ConfidenceMeter({ analysis }) {
  const scoreState = getTrustScoreState(Number(analysis?.trustScore ?? 0));

  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">AI Confidence</p>
      <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-900">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${scoreState.progress} transition-all duration-700`}
          style={{ width: `${analysis?.aiConfidence ?? 0}%` }}
        />
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{analysis?.aiConfidence}%</p>
    </GlassCard>
  );
}
