import { formatDate } from "@/utils/formatDate";
import { GlassCard } from "@/components/ui/GlassCard";

export function BlockInfo({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Block Info</p>
      <div className="mt-5 space-y-3 text-sm text-slate-300">
        <p>Block number: {analysis?.blockchain?.blockNumber}</p>
        <p>Timestamp: {formatDate(analysis?.fingerprint?.timestamp)}</p>
        <p>Verification ID: {analysis?.fingerprint?.verificationId}</p>
      </div>
    </GlassCard>
  );
}
