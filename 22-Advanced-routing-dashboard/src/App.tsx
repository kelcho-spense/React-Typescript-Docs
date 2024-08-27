import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster,toast } from 'sonner';
import Home from './pages/Home'
import Error from './pages/Error'
import User from './pages/User';
import Admin from './pages/Admin';
import RegisterUsers from './features/users/RegisterUsers';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import Me from './dashboard/admin/pages/Me';
import Users from './dashboard/admin/pages/Users';
import UserDashboard from './dashboard/user/UserDashboard';
import Done from './dashboard/user/pages/Done';
import Assigned from './dashboard/user/pages/Assigned';
import Analytics from './dashboard/user/pages/Analytics';
import Pending from './dashboard/user/pages/Pending';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'login/user',
      element: <User />,
    },
    {
      path: 'login/admin',
      element: <Admin />,
    },
    {
      path: 'register/user',
      element: <RegisterUsers />,
    },
    {
      path: 'admin',
      element : <AdminDashboard />,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <h2>Analytics</h2>,
        },
        {
          path: 'users',
          element:<Users/>,
        },
        {
          path: 'me',
          element:<Me/>,
        }
      ]
    },
    {
      path: 'users',
      element: <UserDashboard />,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Analytics />,
        },
        {
          path: 'task-assigned',
          element: <Assigned />,
        },
        {
          path: 'task-done',
          element: <Done />,
        },
        {
          path: 'task-pending',
          element: <Pending />,
        },
        {
          path: 'me',
          element: <Me />,
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position='top-right'
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          }
        }}
      />
    </>
  )
}

export default App
