import { useStore } from '../stores/useStore'

export default function Settings() {
  const { theme, setTheme, clearTodos, notes } = useStore()

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">⚙️ Settings</h2>

      {/* Theme Section */}
      <div className="bg-omega-card border border-white/10 rounded-2xl p-4 space-y-3">
        <h3 className="font-medium">🎨 Theme</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('dark')}
            className={`px-3 py-1 rounded-md text-sm ${
              theme === 'dark'
                ? 'bg-omega-accent/40'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`px-3 py-1 rounded-md text-sm ${
              theme === 'light'
                ? 'bg-omega-accent/40'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Light
          </button>
        </div>
        <p className="text-xs opacity-60">
          Current theme: <span className="text-omega-accent">{theme}</span>
        </p>
      </div>

      {/* Data Section */}
      <div className="bg-omega-card border border-white/10 rounded-2xl p-4 space-y-3">
        <h3 className="font-medium">🧠 App Data</h3>
        <p className="text-xs opacity-70">
          Quick tools to clear local data (Zustand store).
        </p>
        <div className="flex gap-2">
          <button
            onClick={clearTodos}
            className="px-3 py-1 rounded-md bg-red-500/30 hover:bg-red-500/50 text-sm"
          >
            Clear Todos
          </button>
          <button
            onClick={() => localStorage.clear()}
            className="px-3 py-1 rounded-md bg-red-500/30 hover:bg-red-500/50 text-sm"
          >
            Clear LocalStorage
          </button>
        </div>
      </div>

      {/* Debug / Info */}
      <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
        <h3 className="font-medium mb-2">🔍 Debug Info</h3>
        <p className="text-xs opacity-60">
          Notes saved: {notes.length > 0 ? '✅ yes' : '❌ no'}
        </p>
        <p className="text-xs opacity-60">App version: 0.2.0</p>
      </div>
    </div>
  )
}
