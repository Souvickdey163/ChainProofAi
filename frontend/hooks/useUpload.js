"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadFile } from "@/services/uploadService";
import { buildMockAnalysis, normalizeAnalysisResponse } from "@/lib/mockAnalysis";
import { saveAnalysisResult } from "@/store/analysisStore";

export function useUpload() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFiles = (files) => {
    const selected = files?.[0] ?? null;
    setFile(selected);
    setProgress(selected ? 18 : 0);
    setErrorMessage("");
  };

  const startVerification = async () => {
    if (!file || isUploading) {
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setProgress(32);

    try {
      const response = await uploadFile(file);
      setProgress(78);

      const normalized = normalizeAnalysisResponse(response?.data, file);
      saveAnalysisResult(normalized);
      setProgress(100);
      toast.success("Verification analysis complete");
      router.push("/dashboard");
    } catch (error) {
      const fallback = buildMockAnalysis(file);
      saveAnalysisResult(fallback);
      setProgress(100);
      setErrorMessage("Backend unreachable. Showing cinematic demo data.");
      toast("Backend unreachable. Loaded demo analysis instead.", {
        icon: "!"
      });
      router.push("/dashboard");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    file,
    progress,
    isUploading,
    errorMessage,
    handleFiles,
    startVerification
  };
}
