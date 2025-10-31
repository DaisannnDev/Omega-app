import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Shell() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 bg-omega-bg text-white">
        <Outlet />
      </main>
    </div>
  )
}
