import { QRCodeSVG } from "qrcode.react";
import { GlassCard } from "@/components/ui/GlassCard";

export function QRCodeCard({ analysis }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center">
      <p className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200">QR Verification</p>
      <div className="mt-6 rounded-[28px] bg-white p-4">
        <QRCodeSVG value={analysis?.qrVerification?.url ?? "https://chainproof.ai/verify/demo-id"} size={180} />
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">{analysis?.qrVerification?.url}</p>
    </GlassCard>
  );
}
