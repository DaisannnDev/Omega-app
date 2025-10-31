import { useState } from 'react'
import { useStore } from '../../stores/useStore'

export default function TodoWidget() {
  const { todos, addTodo, toggleTodo, clearTodos } = useStore()
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addTodo(text.trim())
    setText('')
  }

  return (
    <div className="bg-omega-card border border-white/10 rounded-2xl p-4">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">📝 Todo</h3>
        <button className="text-xs opacity-70 hover:opacity-100" onClick={clearTodos}>Clear</button>
      </div>
      <ul className="space-y-1 mb-3">
        {todos.map((t, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(i)} />
            <span className={t.done ? 'line-through opacity-60' : ''}>{t.text}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 bg-black/30 border border-white/10 rounded-md px-2 py-1 text-sm"
          placeholder="Add task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-omega-accent/30 hover:bg-omega-accent/40 px-3 py-1 rounded-md text-sm">Add</button>
      </form>
    </div>
  )
}
