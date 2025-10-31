export default function Dm() {
  const messages = [
    { from: 'Dai', text: 'Prototype ready?' },
    { from: 'Pun', text: 'Marketing deck uploading.' },
    { from: 'Gutt', text: '3D icons polished.' },
  ]
  return (
    <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
      <h2 className="font-semibold mb-3">💬 Direct Messages</h2>
      <ul className="text-sm space-y-1">
        {messages.map((m, i) => (
          <li key={i} className="flex gap-2">
            <span className="opacity-70">{m.from}:</span>
            <span>{m.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
