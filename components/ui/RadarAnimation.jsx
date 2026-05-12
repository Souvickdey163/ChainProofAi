export function RadarAnimation() {
  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5">
      <div className="absolute inset-4 rounded-full border border-cyan-300/15" />
      <div className="absolute inset-10 rounded-full border border-cyan-300/10" />
      <div className="absolute h-[2px] w-1/2 origin-left animate-orbit bg-gradient-to-r from-cyan-300 to-transparent" />
      <div className="h-3 w-3 rounded-full bg-accent shadow-neon" />
    </div>
  );
}
