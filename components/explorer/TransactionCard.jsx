import { GlassCard } from "@/components/ui/GlassCard";

export function TransactionCard({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Transaction Hash</p>
      <p className="mt-5 break-all text-sm leading-7 text-slate-300">{analysis?.blockchain?.transactionHash}</p>
    </GlassCard>
  );
}
