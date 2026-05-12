export function TrustWave() {
  return (
    <div className="flex h-32 items-end gap-2">
      {[42, 68, 55, 76, 88, 70, 94, 82].map((height, index) => (
        <div
          key={`${height}-${index}`}
          className="w-4 rounded-full bg-gradient-to-t from-cyan-400/30 to-cyan-200"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
