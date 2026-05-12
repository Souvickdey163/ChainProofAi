import { RadarAnimation } from "@/components/ui/RadarAnimation";
import { ScanPulse } from "@/components/animations/ScanPulse";
import { Loader } from "@/components/ui/Loader";

const telemetry = [
  { label: "Signal integrity", value: "99.2%" },
  { label: "Metadata parity", value: "Stable" },
  { label: "Chain route", value: "Polygon Amoy" }
];

export function ScanningAnimation({ isUploading, progress, stage }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-cyan-300/10 bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.16),transparent_36%),rgba(255,255,255,0.04)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_32px_80px_rgba(2,8,24,0.35)]">
      <div className="absolute -right-14 top-12 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-16 left-0 h-28 w-28 rounded-full bg-violet-400/10 blur-3xl" />
      <ScanPulse />
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">AI Scanning</p>
        <div className="rounded-full border border-cyan-300/20 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-100">
          {progress}% Sync
        </div>
      </div>
      <div className="relative mt-6 rounded-[28px] border border-white/5 bg-slate-950/30 p-4 [transform:perspective(1200px)_rotateX(12deg)]">
        <RadarAnimation />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {telemetry.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/5 bg-slate-950/40 p-3">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
            <p className="mt-2 text-sm text-cyan-100">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-[26px] border border-white/5 bg-slate-950/45 p-4">
        <p className="text-sm text-slate-300">
          {isUploading ? stage : "Stand by for live trust analysis."}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {isUploading
            ? "Running forensic scan, metadata extraction, wallet signing, and proof anchoring."
            : "The trust engine will project AI confidence, tamper signals, and blockchain proof in one pass."}
        </p>
        <div className="mt-4">{isUploading ? <Loader /> : null}</div>
      </div>
    </div>
  );
}
