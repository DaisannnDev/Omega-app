import { NavLink } from 'react-router-dom'

const linkBase = 'px-3 py-2 rounded-lg text-sm'
const linkActive = 'bg-omega-accent/20 text-omega-accent'
const linkInactive = 'hover:bg-white/5'

export default function Navbar() {
  return (
    <nav className="w-64 bg-omega-card border-r border-white/10 p-4 space-y-2">
      <h1 className="text-lg font-bold mb-3">Ω Omega</h1>
      <ul className="space-y-1">
        <li>
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dm" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            DM
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
