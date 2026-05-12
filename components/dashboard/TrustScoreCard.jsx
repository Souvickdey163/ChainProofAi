"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn, getTrustScoreState } from "@/lib/helpers";

export function TrustScoreCard({ analysis }) {
  const [displayScore, setDisplayScore] = useState(0);
  const scoreState = getTrustScoreState(Number(analysis?.trustScore ?? 0));

  useEffect(() => {
    const target = Math.max(0, Math.min(100, Number(analysis?.trustScore ?? 0)));
    let frame = 0;
    const totalFrames = 28;
    const timer = window.setInterval(() => {
      frame += 1;
      const nextValue = Math.round((target / totalFrames) * frame);
      setDisplayScore(nextValue >= target ? target : nextValue);

      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 30);

    return () => window.clearInterval(timer);
  }, [analysis?.trustScore]);

  return (
    <GlassCard>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Trust Score</p>
      <div className="mt-6 flex items-end gap-6">
        <div
          className={cn(
            "flex h-40 w-40 items-center justify-center rounded-full border text-5xl font-semibold text-white",
            scoreState.ring,
            scoreState.surface,
            scoreState.glow
          )}
        >
          {displayScore}
        </div>
        <div>
          <p className={cn("text-sm uppercase tracking-[0.3em]", scoreState.text)}>{scoreState.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{analysis?.status ?? "Verification Pending"}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
            Composite score from metadata integrity, forensic model output, and blockchain proof status.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
