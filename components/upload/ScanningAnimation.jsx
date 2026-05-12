import { RadarAnimation } from "@/components/ui/RadarAnimation";
import { ScanPulse } from "@/components/animations/ScanPulse";
import { Loader } from "@/components/ui/Loader";

export function ScanningAnimation({ isUploading }) {
  return (
    <div className="relative rounded-[28px] border border-white/5 bg-white/5 p-6">
      <ScanPulse />
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">AI Scanning</p>
      <div className="mt-6">
        <RadarAnimation />
      </div>
      <div className="mt-6 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
        <p className="text-sm text-slate-400">
          {isUploading ? "Running forensic scan, metadata extraction, and chain prep..." : "Stand by for live trust analysis."}
        </p>
        <div className="mt-4">{isUploading ? <Loader /> : null}</div>
      </div>
    </div>
  );
}
