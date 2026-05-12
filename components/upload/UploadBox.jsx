"use client";

import { useUpload } from "@/hooks/useUpload";
import { GlassCard } from "@/components/ui/GlassCard";
import { DragDropZone } from "@/components/upload/DragDropZone";
import { FilePreview } from "@/components/upload/FilePreview";
import { UploadProgress } from "@/components/upload/UploadProgress";
import { ScanningAnimation } from "@/components/upload/ScanningAnimation";

export function UploadBox() {
  const { file, progress, isUploading, errorMessage, handleFiles, startVerification } = useUpload();

  return (
    <GlassCard className="space-y-6">
      <div>
        <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Verification Console</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Upload a file for trust analysis</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <div className="space-y-5">
          <DragDropZone onFiles={handleFiles} />
          <UploadProgress progress={progress} />
          <FilePreview file={file} />
          {errorMessage ? <p className="text-sm text-amber-300">{errorMessage}</p> : null}
        </div>
        <ScanningAnimation isUploading={isUploading} />
      </div>
      <button
        type="button"
        onClick={startVerification}
        disabled={!file || isUploading}
        className="inline-flex w-fit items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-glow transition hover:scale-[1.02] hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isUploading ? "Analyzing File..." : "Send to Trust Engine"}
      </button>
    </GlassCard>
  );
}
