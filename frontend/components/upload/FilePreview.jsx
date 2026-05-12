export function FilePreview({ file }) {
  if (!file) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-slate-400">
        File preview will appear here once a document is selected.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
      <p className="text-sm text-slate-400">Selected file</p>
      <p className="mt-2 text-lg font-semibold text-white">{file.name}</p>
      <p className="mt-2 text-sm text-slate-400">{Math.round(file.size / 1024)} KB</p>
    </div>
  );
}
