"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/helpers";

export function DragDropZone({ onFiles }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "video/mp4": [".mp4"]
    },
    onDrop: onFiles
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-[28px] border border-dashed p-10 text-center transition",
        isDragActive
          ? "border-cyan-300 bg-cyan-300/10"
          : "border-cyan-300/20 bg-white/5 hover:border-cyan-300/40"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-10 w-10 text-cyan-200" />
      <p className="mt-4 text-xl font-semibold text-white">Drag and drop verification files</p>
      <p className="mt-3 text-sm text-slate-400">PDF, PNG, JPG, MP4 supported</p>
    </div>
  );
}
