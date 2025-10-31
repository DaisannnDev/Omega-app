import { useEffect, useRef, useState } from 'react'

export default function TimerWidget() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const interval = useRef<number | null>(null)

  useEffect(() => {
    if (running) {
      interval.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    } else if (interval.current) {
      clearInterval(interval.current)
    }
    return () => { if (interval.current) clearInterval(interval.current) }
  }, [running])

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0')
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${h}:${m}:${sec}`
  }

  return (
    <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">⏱ Timer</h3>
      <div className="text-3xl font-mono mb-4">{fmt(seconds)}</div>
      <div className="flex gap-2">
        <button onClick={() => setRunning((r) => !r)} className="px-3 py-1 bg-white/10 rounded-md">
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => setSeconds(0)} className="px-3 py-1 bg-white/10 rounded-md">Reset</button>
      </div>
    </div>
  )
}
