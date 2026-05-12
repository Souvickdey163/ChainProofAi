export function UploadProgress({ progress, stage, isUploading }) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-cyan-300/10 bg-[radial-gradient(circle_at_top,rgba(81,199,255,0.12),transparent_38%),rgba(255,255,255,0.04)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(2,12,28,0.35)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Upload progress</span>
        <span className="font-medium text-cyan-100">{progress}%</span>
      </div>
      <p className="mt-2 text-sm text-slate-400">{stage}</p>
      <div className="mt-5 h-4 overflow-hidden rounded-full border border-white/5 bg-slate-950/80">
        <div
          className="relative h-full rounded-full bg-[linear-gradient(90deg,#51c7ff,#00f5d4,#7b61ff)] bg-[length:200%_100%] transition-all duration-700 animate-shimmer"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute inset-y-0 right-0 w-16 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)] opacity-60 blur-sm" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
        <span>Ingestion</span>
        <span>Forensics</span>
        <span>Blockchain</span>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
        <span className={`h-2.5 w-2.5 rounded-full ${isUploading ? "animate-pulse bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" : "bg-cyan-300/70"}`} />
        <span>{isUploading ? "Live verification stream active" : "Waiting for secure scan dispatch"}</span>
      </div>
    </div>
  );
}
