"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/result", label: "Result" },
  { href: "/explorer", label: "Explorer" }
];

export function Navbar() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/60 px-5 py-3 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-glow">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">ChainProof</p>
            <p className="text-xs text-slate-400">AI Trust Engine</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <GlowButton href="/upload">
          <Sparkles className="mr-2 h-4 w-4" />
          Launch Scan
        </GlowButton>
      </div>
    </motion.header>
  );
}
