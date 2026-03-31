export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated gold bar */}
        <div className="relative w-32 h-px bg-obsidian-800 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-shimmer" />
        </div>
        <p className="text-2xs uppercase tracking-ultra text-gold-500/60">Loading</p>
      </div>
    </div>
  );
}
