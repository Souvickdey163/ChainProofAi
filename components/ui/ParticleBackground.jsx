export function ParticleBackground() {
  return (
    <div className="absolute inset-0 opacity-50">
      <div className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-cyan-300 shadow-glow" />
      <div className="absolute left-[72%] top-[28%] h-2 w-2 rounded-full bg-violet-400 shadow-glow" />
      <div className="absolute left-[24%] top-[64%] h-2 w-2 rounded-full bg-accent shadow-glow" />
      <div className="absolute left-[82%] top-[72%] h-2 w-2 rounded-full bg-cyan-200 shadow-glow" />
    </div>
  );
}
