import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

const items = [
  ["/upload", "Upload Verification"],
  ["/dashboard", "Trust Analysis"],
  ["/result", "Verification Result"],
  ["/explorer", "Blockchain Explorer"]
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 xl:block">
      <GlassCard className="sticky top-28 p-5">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Modules</p>
        <div className="mt-5 space-y-3">
          {items.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </GlassCard>
    </aside>
  );
}
