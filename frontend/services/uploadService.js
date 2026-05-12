import { api } from "@/lib/api";

function formatFileSize(fileSize) {
  if (!fileSize) {
    return undefined;
  }

  return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
}

function buildStatus(trustScore, analysis, blockchain) {
  if (analysis?.tamperingDetected) {
    return "Tampering Detected";
  }

  if (trustScore >= 80 && blockchain?.verified) {
    return "Verified Authentic";
  }

  if (trustScore >= 80) {
    return "Authentic, Awaiting Chain Anchor";
  }

  if (trustScore >= 60) {
    return "Needs Manual Review";
  }

  return "Low Trust Score";
}

function buildAnalysisPayload(uploadData, analysisData) {
  const trustScore = Number(analysisData?.trustScore ?? 0);
  const analysis = analysisData?.analysis ?? {};
  const blockchain = analysisData?.blockchain ?? null;
  const suspiciousRegions = analysis?.suspiciousRegions ?? [];
  const metadataIssues = analysis?.metadataIssues ?? [];
  const ocrConfidence = Math.round(Number(analysis?.ocrConfidence ?? 0) * 100);

  return {
    success: true,
    trustScore,
    status: buildStatus(trustScore, analysis, blockchain),
    blockchainVerified: Boolean(blockchain?.verified),
    aiConfidence: ocrConfidence,
    fingerprint: {
      sha256: uploadData?.fileHash,
      timestamp: analysis?.analyzedAt ?? uploadData?.uploadedAt,
      verificationId: uploadData?.fileId
    },
    metadata: {
      fileName: uploadData?.originalName ?? uploadData?.filename,
      fileType: uploadData?.mimeType,
      fileSize: formatFileSize(uploadData?.fileSize),
      createdAt: uploadData?.uploadedAt,
      modified: Boolean(analysis?.tamperingDetected)
    },
    analysis: {
      tamperingDetected: Boolean(analysis?.tamperingDetected),
      deepfakeProbability: null,
      ocrMismatch: ocrConfidence < 60,
      ocrConfidence,
      metadataMismatch: metadataIssues.length > 0,
      suspiciousRegions,
      metadataIssues,
      detailedReport: analysis?.detailedReport ?? {}
    },
    blockchain: blockchain
      ? {
          network: "Polygon Amoy",
          transactionHash: blockchain.transactionHash,
          blockNumber: blockchain.blockNumber,
          verified: Boolean(blockchain.verified)
        }
      : null,
    qrVerification: {
      url: uploadData?.verificationLink
    }
  };
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  const uploadData = uploadResponse?.data?.data;
  const fileId = uploadData?.fileId;

  if (!fileId) {
    throw new Error("Upload succeeded but no fileId was returned.");
  }

  const analysisResponse = await api.post("/analyze", { fileId });
  const analysisData = analysisResponse?.data?.data;

  return {
    data: buildAnalysisPayload(uploadData, analysisData)
  };
}
