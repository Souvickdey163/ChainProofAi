import { GlassCard } from "@/components/ui/GlassCard";

export function ProblemSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          ["Synthetic Content", "Deepfakes and generative edits break surface-level trust checks."],
          ["Metadata Fraud", "Attackers rewrite origin trails, timestamps, and device signatures."],
          ["No Immutable Proof", "Traditional audit logs do not anchor evidence to a verifiable ledger."]
        ].map(([title, text]) => (
          <GlassCard key={title}>
            <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">{title}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
