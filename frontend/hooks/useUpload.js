"use client";

import { useEffect, useRef, useState } from "react";
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
  const [scanStage, setScanStage] = useState("Awaiting secure file intake");
  const progressTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  const stopProgressLoop = () => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const startProgressLoop = () => {
    stopProgressLoop();
    progressTimerRef.current = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 92) {
          stopProgressLoop();
          return current;
        }

        if (current < 52) {
          return current + 7;
        }

        if (current < 76) {
          return current + 4;
        }

        return current + 2;
      });
    }, 280);
  };

  const handleFiles = (files) => {
    const selected = files?.[0] ?? null;
    setFile(selected);
    setProgress(selected ? 18 : 0);
    setErrorMessage("");
    setScanStage(selected ? "Payload staged for verification" : "Awaiting secure file intake");
  };

  const startVerification = async () => {
    if (!file || isUploading) {
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setProgress(32);
    setScanStage("Uploading encrypted payload");
    startProgressLoop();

    try {
      const response = await uploadFile(file);
      setScanStage("Correlating AI, metadata, and chain evidence");
      setProgress((current) => Math.max(current, 94));

      const normalized = normalizeAnalysisResponse(response?.data, file);
      saveAnalysisResult(normalized);
      stopProgressLoop();
      setScanStage("Verification lock acquired");
      setProgress(100);
      toast.success("Verification analysis complete");
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      router.push("/dashboard");
    } catch (error) {
      const fallback = buildMockAnalysis(file);
      saveAnalysisResult(fallback);
      stopProgressLoop();
      setScanStage("Backend unavailable, switching to cinematic demo");
      setProgress(100);
      setErrorMessage("Backend unreachable. Showing cinematic demo data.");
      toast("Backend unreachable. Loaded demo analysis instead.", {
        icon: "!"
      });
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      router.push("/dashboard");
    } finally {
      stopProgressLoop();
      setIsUploading(false);
    }
  };

  return {
    file,
    progress,
    isUploading,
    errorMessage,
    scanStage,
    handleFiles,
    startVerification
  };
}
