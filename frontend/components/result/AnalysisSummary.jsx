import { GlassCard } from "@/components/ui/GlassCard";

export function AnalysisSummary({ analysis }) {
  const metadataIssues = analysis?.analysis?.metadataIssues ?? [];

  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Analysis Summary</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ["Metadata mismatch", analysis?.analysis?.metadataMismatch ? `${metadataIssues.length} issue(s)` : "None detected"],
          ["Visual anomaly", analysis?.analysis?.tamperingDetected ? "High-risk region found" : "No critical anomalies"],
          ["Chain status", analysis?.blockchainVerified ? "Anchored and verified" : "Pending verification"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
