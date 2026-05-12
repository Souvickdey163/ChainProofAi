"use client";

import { useAnalysis } from "@/hooks/useAnalysis";

export function useBlockchain() {
  const { analysis } = useAnalysis();
  const blockchain = analysis?.blockchain ?? {};

  return {
    network: blockchain.network ?? "Polygon Amoy",
    status: analysis?.blockchainVerified ? "Confirmed" : "Pending",
    txHash: blockchain.txHash ?? ""
  };
}
