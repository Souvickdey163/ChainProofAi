export function Loader() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-3 w-3 animate-ping rounded-full bg-cyan-300" />
      <div className="h-3 w-3 animate-ping rounded-full bg-cyan-300 [animation-delay:180ms]" />
      <div className="h-3 w-3 animate-ping rounded-full bg-cyan-300 [animation-delay:360ms]" />
    </div>
  );
}
