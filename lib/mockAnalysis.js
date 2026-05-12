function randomHash(length) {
  const chars = "abcdef0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function buildMockAnalysis(file) {
  const now = new Date().toISOString();
  const trustScore = 91;
  const blockchainVerified = true;
  const status = trustScore >= 75 ? "Verified Authentic" : "Tampering Detected";
  const verificationId = `CPAI-${new Date().getFullYear()}-00192`;
  const suspiciousRegions = trustScore >= 75 ? [] : [{ x: 210, y: 120, width: 180, height: 60 }];

  return {
    success: true,
    trustScore,
    status,
    blockchainVerified,
    aiConfidence: 96,
    fingerprint: {
      sha256: randomHash(64),
      timestamp: now,
      verificationId
    },
    metadata: {
      fileName: file?.name || "payment-proof.png",
      fileType: file?.type || "image/png",
      fileSize: file?.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "2.4 MB",
      createdAt: now,
      modified: false
    },
    analysis: {
      tamperingDetected: !blockchainVerified,
      deepfakeProbability: trustScore >= 75 ? 4 : 68,
      ocrMismatch: false,
      metadataMismatch: false,
      suspiciousRegions
    },
    blockchain: {
      network: "Polygon Amoy",
      transactionHash: `0x${randomHash(64)}`,
      blockNumber: 492201,
      wallet: `0x${randomHash(40)}`
    },
    qrVerification: {
      url: `https://chainproof.ai/verify/${verificationId}`
    }
  };
}

export function normalizeAnalysisResponse(data, file) {
  const fallback = buildMockAnalysis(file);
  const fingerprint = {
    ...fallback.fingerprint,
    ...(data?.fingerprint ?? {})
  };
  const metadata = {
    ...fallback.metadata,
    ...(data?.metadata ?? {})
  };
  const analysis = {
    ...fallback.analysis,
    ...(data?.analysis ?? {})
  };
  const blockchain = {
    ...fallback.blockchain,
    ...(data?.blockchain ?? {})
  };
  const qrVerification = {
    ...fallback.qrVerification,
    ...(data?.qrVerification ?? {})
  };
  const aiConfidence = Number(
    data?.aiConfidence ??
      (typeof analysis.deepfakeProbability === "number" ? Math.max(0, 100 - analysis.deepfakeProbability) : fallback.aiConfidence)
  );

  return {
    ...fallback,
    ...data,
    success: data?.success ?? true,
    trustScore: Number(data?.trustScore ?? fallback.trustScore),
    status: data?.status ?? fallback.status,
    blockchainVerified: data?.blockchainVerified ?? fallback.blockchainVerified,
    aiConfidence,
    fingerprint,
    metadata: {
      ...metadata,
      fileName: metadata.fileName ?? file?.name ?? fallback.metadata.fileName,
      fileType: metadata.fileType ?? file?.type ?? fallback.metadata.fileType
    },
    analysis,
    suspiciousRegions: analysis.suspiciousRegions ?? [],
    blockchain,
    qrVerification
  };
}
