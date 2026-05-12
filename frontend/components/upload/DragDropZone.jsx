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
        "group relative overflow-hidden rounded-[32px] border border-dashed p-10 text-center transition duration-300",
        isDragActive
          ? "border-cyan-300 bg-cyan-300/10 shadow-[0_0_0_1px_rgba(103,232,249,0.25),0_24px_80px_rgba(34,211,238,0.12)]"
          : "border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(81,199,255,0.12),transparent_38%),rgba(255,255,255,0.04)] hover:border-cyan-300/40 hover:shadow-[0_24px_80px_rgba(34,211,238,0.08)]"
      )}
    >
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="pointer-events-none absolute -top-8 right-10 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl transition duration-500 group-hover:scale-125" />
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-10 w-10 text-cyan-200 transition duration-300 group-hover:-translate-y-1" />
      <p className="mt-4 text-xl font-semibold text-white">Drag and drop verification files</p>
      <p className="mt-3 text-sm text-slate-400">PDF, PNG, JPG, MP4 supported</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.26em] text-slate-500">
        <span className="rounded-full border border-white/5 bg-slate-950/40 px-3 py-2">Tamper scan</span>
        <span className="rounded-full border border-white/5 bg-slate-950/40 px-3 py-2">Metadata lens</span>
        <span className="rounded-full border border-white/5 bg-slate-950/40 px-3 py-2">Chain proof</span>
      </div>
    </div>
  );
}
