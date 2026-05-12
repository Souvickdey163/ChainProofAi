import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/utils/formatDate";

export function MetadataPanel({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Metadata Analysis</p>
      <div className="mt-5 space-y-3 text-sm text-slate-300">
        <p>File name: {analysis?.metadata?.fileName}</p>
        <p>File type: {analysis?.metadata?.fileType}</p>
        <p>File size: {analysis?.metadata?.fileSize}</p>
        <p>Created: {formatDate(analysis?.metadata?.createdAt)}</p>
        <p>Modified: {analysis?.metadata?.modified ? "Yes" : "No"}</p>
      </div>
    </GlassCard>
  );
}
