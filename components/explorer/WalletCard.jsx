import { GlassCard } from "@/components/ui/GlassCard";

export function WalletCard({ analysis }) {
  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Wallet Address</p>
      <p className="mt-5 break-all text-sm leading-7 text-slate-300">{analysis?.blockchain?.wallet}</p>
    </GlassCard>
  );
}
