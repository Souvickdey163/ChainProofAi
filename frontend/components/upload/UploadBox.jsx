"use client";

import { motion } from "framer-motion";
import { Activity, DatabaseZap, Orbit, ShieldCheck } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";
import { GlassCard } from "@/components/ui/GlassCard";
import { DragDropZone } from "@/components/upload/DragDropZone";
import { FilePreview } from "@/components/upload/FilePreview";
import { UploadProgress } from "@/components/upload/UploadProgress";
import { ScanningAnimation } from "@/components/upload/ScanningAnimation";

const statCards = [
  { icon: ShieldCheck, label: "Tamper model", value: "ELA + OCR + metadata" },
  { icon: Orbit, label: "3D trust sweep", value: "Live scene telemetry" },
  { icon: DatabaseZap, label: "Anchoring", value: "Polygon-backed proof" }
];

const featureRows = [
  {
    title: "Forensic Depth",
    text: "Every upload passes through layered anomaly scoring, OCR confidence mapping, and metadata integrity checks."
  },
  {
    title: "Chain Lock",
    text: "Trusted files can be anchored to Polygon so your dashboard shows a verifiable transaction trail."
  },
  {
    title: "Operator View",
    text: "A cinematic scan surface makes the flow feel active instead of stalling on a static 18% bar."
  }
];

export function UploadBox() {
  const { file, progress, isUploading, errorMessage, scanStage, handleFiles, startVerification } = useUpload();

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <GlassCard className="relative overflow-hidden border border-cyan-300/10 p-8">
          <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute right-6 top-0 h-40 w-40 rounded-full bg-violet-400/10 blur-3xl" />
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Verification Console</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white md:text-5xl">Upload a file for trust analysis</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            A more cinematic operator panel for document uploads, AI forensics, metadata auditing, and blockchain proof capture.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {statCards.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-[24px] border border-white/5 bg-slate-950/35 p-4 [transform:perspective(1200px)_rotateX(8deg)]">
                <Icon className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="border border-cyan-300/10 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Live Mission</p>
              <p className="mt-1 text-sm text-slate-300">{scanStage}</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-white/5 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current payload</p>
              <p className="mt-2 text-lg text-white">{file?.name || "No file loaded"}</p>
            </div>
            <div className="rounded-[24px] border border-white/5 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Pipeline readiness</p>
              <p className="mt-2 text-lg text-white">{isUploading ? "Processing live" : "Awaiting dispatch"}</p>
            </div>
            <div className="rounded-[24px] border border-white/5 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Confidence rail</p>
              <p className="mt-2 text-lg text-white">{progress}%</p>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      <GlassCard className="space-y-6 border border-cyan-300/10 p-8">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Verification Console</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">High-visibility intake deck</h2>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
          <div className="space-y-5">
            <DragDropZone onFiles={handleFiles} />
            <UploadProgress progress={progress} stage={scanStage} isUploading={isUploading} />
            <FilePreview file={file} />
            {errorMessage ? <p className="text-sm text-amber-300">{errorMessage}</p> : null}
          </div>
          <ScanningAnimation isUploading={isUploading} progress={progress} stage={scanStage} />
        </div>
        <button
          type="button"
          onClick={startVerification}
          disabled={!file || isUploading}
          className="inline-flex w-fit items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950 shadow-glow transition hover:scale-[1.02] hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isUploading ? "Analyzing File..." : "Send to Trust Engine"}
        </button>
      </GlassCard>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="border border-cyan-300/10 p-6">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Capability Grid</p>
          <div className="mt-6 space-y-4">
            {featureRows.map((row) => (
              <div key={row.title} className="rounded-[24px] border border-white/5 bg-slate-950/35 p-5">
                <p className="text-lg font-semibold text-white">{row.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{row.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="border border-cyan-300/10 p-6">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">Trust Sequence</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/5 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">01 Intake</p>
              <p className="mt-3 text-xl text-white">Secure upload envelope</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Files are staged with visible feedback instead of a frozen progress bar.</p>
            </div>
            <div className="rounded-[24px] border border-white/5 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">02 Analysis</p>
              <p className="mt-3 text-xl text-white">AI and metadata fusion</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">OCR confidence, tamper cues, and metadata anomalies are assembled into one trust readout.</p>
            </div>
            <div className="rounded-[24px] border border-white/5 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">03 Proof</p>
              <p className="mt-3 text-xl text-white">Chain-ready verification</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Eligible files can be anchored on-chain and carried into the dashboard as proof artifacts.</p>
            </div>
            <div className="rounded-[24px] border border-white/5 bg-slate-950/35 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">04 Handoff</p>
              <p className="mt-3 text-xl text-white">Dashboard transition</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">The UI now reaches `100%` and holds long enough to feel intentional before routing onward.</p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
