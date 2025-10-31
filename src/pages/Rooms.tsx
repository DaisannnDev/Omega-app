import { useState } from 'react'

interface Room {
  id: string
  name: string
  people: number
  joined: boolean
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 'focus', name: '🎧 Focus Room', people: 2, joined: false },
    { id: 'design', name: '🎨 Design Lab', people: 3, joined: false },
    { id: 'music', name: '🎵 Music Jam', people: 1, joined: false },
  ])

  const handleJoin = (id: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, joined: !r.joined, people: r.joined ? r.people - 1 : r.people + 1 }
          : r
      )
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">🔊 Voice Rooms</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-omega-card border border-white/10 rounded-2xl p-4 transition hover:border-omega-accent/50"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{room.name}</h3>
                <p className="text-xs opacity-60">{room.people} online</p>
              </div>
              <button
                onClick={() => handleJoin(room.id)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  room.joined
                    ? 'bg-red-500/30 hover:bg-red-500/50'
                    : 'bg-omega-accent/30 hover:bg-omega-accent/50'
                }`}
              >
                {room.joined ? 'Leave' : 'Join'}
              </button>
            </div>

            {room.joined && (
              <div className="mt-3 p-2 bg-black/20 rounded-md text-xs text-center opacity-80">
                🔉 You are connected to this room
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
