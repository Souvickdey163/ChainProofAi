"use client";

import { TransactionCard } from "@/components/explorer/TransactionCard";
import { BlockInfo } from "@/components/explorer/BlockInfo";
import { WalletCard } from "@/components/explorer/WalletCard";
import { VerificationTimeline } from "@/components/explorer/VerificationTimeline";
import { Loader } from "@/components/ui/Loader";
import { useAnalysis } from "@/hooks/useAnalysis";

export function ExplorerClient() {
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
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <TransactionCard analysis={analysis} />
        <BlockInfo analysis={analysis} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <WalletCard analysis={analysis} />
        <VerificationTimeline analysis={analysis} />
      </div>
    </div>
  );
}
