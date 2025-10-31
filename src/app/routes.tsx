
import { createBrowserRouter } from 'react-router-dom'
import Shell from '../components/Shell'
import Home from '../pages/Home'
import Dm from '../pages/Dm'
import Rooms from '../pages/Rooms'
import Settings from '../pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dm', element: <Dm /> },
      { path: 'rooms', element: <Rooms /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])
