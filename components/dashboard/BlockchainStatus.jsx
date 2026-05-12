import { formatDate } from "@/utils/formatDate";
import { GlassCard } from "@/components/ui/GlassCard";

export function BlockchainStatus({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Blockchain Status</p>
      <div className="mt-5 space-y-3 text-sm text-slate-300">
        <p>{analysis?.blockchainVerified ? "Verification anchored" : "Verification pending"}</p>
        <p>Network: {analysis?.blockchain?.network}</p>
        <p>Transaction: {analysis?.blockchain?.transactionHash}</p>
        <p>Block number: {analysis?.blockchain?.blockNumber}</p>
        <p>Timestamp: {formatDate(analysis?.fingerprint?.timestamp)}</p>
      </div>
    </GlassCard>
  );
}
