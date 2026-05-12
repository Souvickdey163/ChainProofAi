import { formatDate } from "@/utils/formatDate";
import { GlassCard } from "@/components/ui/GlassCard";

export function VerificationTimeline({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Verification Timeline</p>
      <div className="mt-5 space-y-4">
        {[
          `Upload received: ${analysis?.metadata?.fileName}`,
          `Metadata extracted: ${analysis?.metadata?.fileType}`,
          `AI scan completed: ${analysis?.status}`,
          `Fingerprint created: ${analysis?.fingerprint?.verificationId}`,
          `Blockchain timestamp: ${formatDate(analysis?.fingerprint?.timestamp)}`
        ].map((entry) => (
          <div key={entry} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300">
            {entry}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
