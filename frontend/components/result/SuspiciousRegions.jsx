import { GlassCard } from "@/components/ui/GlassCard";

export function SuspiciousRegions({ analysis }) {
  const isVerified = analysis?.status?.toLowerCase().includes("verified");
  const regions = analysis?.analysis?.suspiciousRegions ?? [];

  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Suspicious Regions</p>
      <div className="mt-6 rounded-[28px] border border-white/5 bg-[linear-gradient(135deg,rgba(81,199,255,0.08),rgba(255,255,255,0.03))] p-8">
        <div className="relative aspect-video rounded-[24px] border border-dashed border-cyan-300/25 bg-slate-950/60">
          {regions.length ? (
            regions.map((region, index) => (
              <div
                key={`${region.x}-${region.y}-${index}`}
                className="absolute rounded-2xl border border-rose-400/70 bg-rose-400/10"
                style={{
                  left: `${region.x / 6}px`,
                  top: `${region.y / 6}px`,
                  width: `${Math.max(region.width / 6, 24)}px`,
                  height: `${Math.max(region.height / 6, 24)}px`
                }}
              />
            ))
          ) : (
            <div className={`absolute left-[18%] top-[22%] h-16 w-20 rounded-2xl border ${isVerified ? "border-emerald-300/40" : "border-rose-400/70"} bg-white/5`} />
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">Highlighted regions detected: {regions.length}</p>
    </GlassCard>
  );
}
