import { GlassCard } from "@/components/ui/GlassCard";

export function AIAnalysisCard({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">AI Analysis</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ["Tampering detected", analysis?.analysis?.tamperingDetected ? "Yes" : "No"],
          ["Deepfake probability", `${analysis?.analysis?.deepfakeProbability ?? 0}%`],
          ["OCR mismatch", analysis?.analysis?.ocrMismatch ? "Yes" : "No"],
          ["Metadata mismatch", analysis?.analysis?.metadataMismatch ? "Yes" : "No"],
          ["Suspicious regions", analysis?.analysis?.suspiciousRegions?.length ?? 0]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
