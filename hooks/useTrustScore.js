"use client";

import { useAnalysis } from "@/hooks/useAnalysis";

export function useTrustScore() {
  const { trustScore } = useAnalysis();

  return {
    score: trustScore,
    label: trustScore >= 75 ? "High Trust" : "High Risk"
  };
}
