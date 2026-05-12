export function FilePreview({ file }) {
  if (!file) {
    return (
      <div className="rounded-[28px] border border-white/5 bg-white/5 p-5 text-sm text-slate-400">
        File preview will appear here once a document is selected.
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-cyan-300/10 bg-[radial-gradient(circle_at_top,rgba(81,199,255,0.08),transparent_40%),rgba(255,255,255,0.04)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Selected file</p>
          <p className="mt-2 text-lg font-semibold text-white">{file.name}</p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-100">
          armed
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Size</p>
          <p className="mt-2 text-sm text-white">{Math.round(file.size / 1024)} KB</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Type</p>
          <p className="mt-2 text-sm text-white">{file.type || "Unknown"}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Threat Gate</p>
          <p className="mt-2 text-sm text-white">Ready for scan</p>
        </div>
      </div>
    </div>
  );
}
