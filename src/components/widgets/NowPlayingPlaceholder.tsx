export default function NowPlayingPlaceholder() {
  return (
    <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">🎵 Now Playing</h3>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-lg bg-white/10 animate-pulse" />
        <div className="flex-1">
          <div className="h-3 rounded bg-white/10 mb-2" />
          <div className="h-3 rounded bg-white/10 w-2/3" />
        </div>
      </div>
      <p className="text-xs opacity-60 mt-3">Connect Spotify later...</p>
    </div>
  )
}
