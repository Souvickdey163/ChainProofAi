"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadarAnimation } from "@/components/ui/RadarAnimation";
import { HologramEffect } from "@/components/animations/HologramEffect";

export function HeroSection() {
  return (
    <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 lg:grid-cols-[1.2fr_0.9fr]">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100">
          <ShieldCheck className="h-4 w-4" />
          AI Trust Infrastructure
        </div>
        <div className="space-y-5">
          <p className="font-display text-xs uppercase tracking-[0.45em] text-cyan-200/80">
            Cybersecurity grade verification
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-glow md:text-7xl">
            In the AI era, digital trust is collapsing.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            ChainProof AI combines forensic AI, metadata intelligence, and blockchain anchoring
            to verify whether files are authentic, manipulated, or weaponized.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <GlowButton href="/upload">
            Start Verification
            <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
          <GlowButton href="/dashboard" className="bg-transparent text-cyan-100">
            Live Trust Dashboard
          </GlowButton>
        </div>
      </motion.div>
      <GlassCard className="relative overflow-hidden p-8">
        <HologramEffect />
        <div className="relative z-10 space-y-6">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Threat Scan</p>
          <RadarAnimation />
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Trust score</p>
              <p className="mt-2 text-3xl font-semibold text-white">98.2</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Threat vectors</p>
              <p className="mt-2 text-3xl font-semibold text-white">03</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
