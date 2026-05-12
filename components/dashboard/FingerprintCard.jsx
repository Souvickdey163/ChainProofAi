import { formatDate } from "@/utils/formatDate";
import { GlassCard } from "@/components/ui/GlassCard";

export function FingerprintCard({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">SHA-256 Fingerprint</p>
      <p className="mt-5 break-all text-sm leading-7 text-slate-300">{analysis?.fingerprint?.sha256}</p>
      <div className="mt-5 space-y-2 text-sm text-slate-400">
        <p>Verification ID: {analysis?.fingerprint?.verificationId}</p>
        <p>Timestamp: {formatDate(analysis?.fingerprint?.timestamp)}</p>
      </div>
    </GlassCard>
  );
}
