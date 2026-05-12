"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { VerificationStatus } from "@/components/result/VerificationStatus";
import { SuspiciousRegions } from "@/components/result/SuspiciousRegions";
import { ConfidenceMeter } from "@/components/result/ConfidenceMeter";
import { AnalysisSummary } from "@/components/result/AnalysisSummary";
import { Loader } from "@/components/ui/Loader";
import { useAnalysis } from "@/hooks/useAnalysis";

export function ResultClient() {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex justify-end">
        <GlowButton href="/explorer">Open Blockchain Explorer</GlowButton>
      </div>
      <VerificationStatus analysis={analysis} />
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <SuspiciousRegions analysis={analysis} />
        <ConfidenceMeter analysis={analysis} />
      </div>
      <AnalysisSummary analysis={analysis} />
    </div>
  );
}
