import { useStore } from '../../stores/useStore'

export default function NotesWidget() {
  const { notes, setNotes } = useStore()
  return (
    <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">🗒 Notes</h3>
      <textarea
        className="w-full h-40 bg-black/30 border border-white/10 rounded-md p-2 text-sm resize-none"
        placeholder="Write your notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  )
}
