import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/utils/formatDate";

export function MetadataPanel({ analysis }) {
  const metadataIssues = analysis?.analysis?.metadataIssues ?? [];

  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Metadata Analysis</p>
      <div className="mt-5 space-y-3 text-sm text-slate-300">
        <p>File name: {analysis?.metadata?.fileName}</p>
        <p>File type: {analysis?.metadata?.fileType}</p>
        <p>File size: {analysis?.metadata?.fileSize}</p>
        <p>Created: {formatDate(analysis?.metadata?.createdAt)}</p>
        <p>Modified: {analysis?.metadata?.modified ? "Yes" : "No"}</p>
        <p>Metadata issues: {metadataIssues.length || "None"}</p>
        {metadataIssues.length ? (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-xs leading-6 text-slate-400">
            {metadataIssues.slice(0, 3).map((issue) => (
              <p key={issue}>{issue}</p>
            ))}
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}
