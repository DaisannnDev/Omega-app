export default function CalendarGlance() {
  const events = [
    { time: '09:00', title: 'Team Standup' },
    { time: '13:00', title: 'Design Sync' },
    { time: '17:00', title: 'Wrap-up' },
  ]

  return (
    <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">📅 Today</h3>
      <ul className="text-sm space-y-2">
        {events.map((e, i) => (
          <li key={i} className="flex justify-between">
            <span className="opacity-70">{e.time}</span>
            <span>{e.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
