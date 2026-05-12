import { Fingerprint, ScanSearch, ShieldEllipsis, Blocks } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const items = [
  [ScanSearch, "AI Forensics", "Detect synthetic manipulation, visual anomalies, and tamper patterns."],
  [Fingerprint, "SHA-256 Fingerprinting", "Generate immutable fingerprints for every verification event."],
  [ShieldEllipsis, "Trust Scoring", "Merge signals into a clear, judge-friendly trust confidence layer."],
  [Blocks, "Blockchain Anchoring", "Push verification IDs and hashes into an auditable ledger trail."]
];

export function Features() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Capabilities</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">A startup-grade trust engine interface.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map(([Icon, title, text]) => (
          <GlassCard key={title} className="relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
