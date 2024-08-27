import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error.tsx'
import Register from './pages/Register.tsx'
import Contact from './pages/Contact.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Users from './components/dashboard/Users.tsx'
import UserProfiles from './components/dashboard/UserProfiles.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement:<Error/>,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement:<Error/>,
  },
  {
    path: 'contact',
    element: <Contact />,
    errorElement:<Error/>,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement:<Error/>,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "user-profiles",
        element: <UserProfiles />,
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
