import TodoWidget from '../components/widgets/TodoWidget'
import TimerWidget from '../components/widgets/TimerWidget'
import NotesWidget from '../components/widgets/NotesWidget'
import CalendarGlance from '../components/widgets/CalendarGlance'
import NowPlayingPlaceholder from '../components/widgets/NowPlayingPlaceholder'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <TodoWidget />
      <TimerWidget />
      <NotesWidget />
      <CalendarGlance />
      <NowPlayingPlaceholder />
    </div>
  )
}
