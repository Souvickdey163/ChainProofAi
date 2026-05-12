import Link from "next/link";

const productLinks = [
  { href: "/upload", label: "Verification Console" },
  { href: "/dashboard", label: "Trust Dashboard" },
  { href: "/result", label: "Result Surface" },
  { href: "/explorer", label: "Chain Explorer" }
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/5 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">ChainProof AI</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Digital trust verification for the AI era, combining cinematic document forensics with blockchain-backed proof.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Modules</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Stack</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <p>AI analysis and metadata integrity</p>
            <p>Polygon anchoring and verification history</p>
            <p>Operator-first dashboard for upload to proof handoff</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/5 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>ChainProof AI. Digital trust verification for the AI era.</p>
        <p>AI analysis, metadata integrity, blockchain anchoring.</p>
      </div>
    </footer>
  );
}
