"use client";

import { useEffect, useState } from "react";
import { getAnalysisResult } from "@/store/analysisStore";
import { buildMockAnalysis } from "@/lib/mockAnalysis";

export function useAnalysis() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const stored = getAnalysisResult();
    setAnalysis(stored ?? buildMockAnalysis());
  }, []);

  return {
    analysis,
    trustScore: analysis?.trustScore ?? 0,
    aiConfidence: analysis?.aiConfidence ?? 0,
    anomalyCount: analysis?.analysis?.suspiciousRegions?.length ?? 0
  };
}
