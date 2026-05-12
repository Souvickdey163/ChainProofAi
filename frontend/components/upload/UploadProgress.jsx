export function UploadProgress({ progress }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Upload progress</span>
        <span>{progress}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-900">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#51c7ff,#00f5d4,#7b61ff)] bg-[length:200%_100%] transition-all duration-700 animate-shimmer"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
