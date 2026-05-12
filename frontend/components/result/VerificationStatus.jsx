import { ShieldCheck, TriangleAlert } from "lucide-react";
import { cn, getTrustScoreState } from "@/lib/helpers";
import { GlassCard } from "@/components/ui/GlassCard";

export function VerificationStatus({ analysis }) {
  const isVerified = Boolean(analysis?.blockchainVerified) || Number(analysis?.trustScore ?? 0) >= 80;
  const scoreState = getTrustScoreState(Number(analysis?.trustScore ?? 0));

  return (
    <GlassCard className={cn(isVerified ? "border-emerald-400/20" : "border-rose-400/20", scoreState.glow)}>
      <p className={`font-display text-xs uppercase tracking-[0.35em] ${isVerified ? "text-emerald-300" : "text-rose-300"}`}>
        Verification Status
      </p>
      <div className="mt-4 flex items-center gap-3">
        {isVerified ? <ShieldCheck className="h-8 w-8 text-emerald-300" /> : <TriangleAlert className="h-8 w-8 text-rose-300" />}
        <h1 className="text-4xl font-semibold text-white">{analysis?.status}</h1>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        {isVerified
          ? "Integrity checks passed across AI analysis, metadata consistency, and ledger verification."
          : "The result needs review because the trust score is lower, metadata issues were found, or chain anchoring is still pending."}
      </p>
    </GlassCard>
  );
}
