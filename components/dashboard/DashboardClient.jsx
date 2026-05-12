"use client";

import { GlowButton } from "@/components/ui/GlowButton";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";
import { AIAnalysisCard } from "@/components/dashboard/AIAnalysisCard";
import { MetadataPanel } from "@/components/dashboard/MetadataPanel";
import { BlockchainStatus } from "@/components/dashboard/BlockchainStatus";
import { FingerprintCard } from "@/components/dashboard/FingerprintCard";
import { QRCodeCard } from "@/components/dashboard/QRCodeCard";
import { TrustGraph } from "@/components/dashboard/TrustGraph";
import { Loader } from "@/components/ui/Loader";
import { useAnalysis } from "@/hooks/useAnalysis";

export function DashboardClient() {
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
        <GlowButton href="/result">Open Verification Result</GlowButton>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
        <TrustScoreCard analysis={analysis} />
        <AIAnalysisCard analysis={analysis} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <MetadataPanel analysis={analysis} />
        <BlockchainStatus analysis={analysis} />
        <FingerprintCard analysis={analysis} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <TrustGraph analysis={analysis} />
        <QRCodeCard analysis={analysis} />
      </div>
    </div>
  );
}
