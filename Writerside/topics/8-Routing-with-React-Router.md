# 11. Routing with React Router

[React Router DOM v6](https://reactrouter.com/en/main) is a popular library for handling routing in React applications. It allows developers to create navigation between different pages or views within a single-page application (SPA), manage complex routing logic, and define how components should be rendered based on the current URL.

### What is React Router DOM v6?

React Router DOM v6 is the latest version of React Router, offering several improvements and changes over previous versions. It simplifies the API, introduces new hooks like `useNavigate`, and provides enhanced support for nested routes, layouts, and protected routes.

### Key Features:
- **Declarative Routing**: Define routes and their corresponding components declaratively in your React components.
- **Nested Routes**: Support for nested routes allows more complex and modular routing structures.
- **Dynamic Routing**: Ability to define routes dynamically based on application state or user roles.
- **Hooks API**: New hooks like `useNavigate` and `useParams` provide easier ways to interact with the routing system.
- **Route Guards**: Support for protected and private routes, allowing you to control access based on authentication or user roles.

---
To update the application using `NavLink` for the navigation bar and setting up routing with `createBrowserRouter` (from `react-router-dom v6.4+`), follow these steps:

### Step 1: Install Required Packages

First, make sure you have the latest version of `react-router-dom` that supports `createBrowserRouter` and `RouterProvider`.

```bash
npm install react-router-dom
```

### Step 2: Update Your Project to Use `createBrowserRouter`

We will modify the project to use `createBrowserRouter` to define routes and `RouterProvider` to supply these routes to the app.

### 1. Create the Page Components

If you haven’t already, create the page components (`Home`, `About`, `Contact`) in the `src/pages` directory.

```Javascript
// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">Home Page</h1>
      <p className="mt-4">Welcome to the home page!</p>
    </div>
  );
};

export default Home;
```

```Javascript
// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-600">About Page</h1>
      <p className="mt-4">This is the about page.</p>
    </div>
  );
};

export default About;
```

```Javascript
// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-red-600">Contact Page</h1>
      <p className="mt-4">Feel free to reach out to us!</p>
    </div>
  );
};

export default Contact;
```

```Javascript
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

// Define a type for possible error shapes
type RouteError = {
  statusText?: string;
  message?: string;
};

function ErrorPage() {
  const error = useRouteError(); // The error might be of any type

  // Check if the error is a route error response
  if (isRouteErrorResponse(error)) {
    return (
      <div
        id="error-page"
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800"
      >
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="italic text-gray-500">
          {error.statusText || "Unknown error"}
        </p>
      </div>
    );
  }

  // Handle non-route errors (e.g., custom thrown errors)
  const customError = error as RouteError;

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800"
    >
      <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="italic text-gray-500">
        {customError?.message || "Unknown error"}
      </p>
    </div>
  );
}

export default ErrorPage;

```

### 2. Set Up the Router in `main.jsx`

Now, we will define the router using `createBrowserRouter` and use `RouterProvider` to handle the routes.

```Javascript
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Main layout that holds the Navbar
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### 3. Create the `App.jsx` with the Navbar Using `NavLink`

In `App.jsx`, we'll create the main layout that includes the navigation bar with `NavLink` and renders the `Outlet` for nested routes.

```Javascript
// src/App.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar with NavLink */}
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-400'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-400'
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-400'
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main content: Render the nested routes */}
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
```

### Explanation:

- **`NavLink`**: We're using `NavLink` for the navigation bar, which automatically applies an `isActive` class when the route matches the current URL. You can style the active links with a blue color (`text-blue-400`).

- **`createBrowserRouter`**: This is used to define routes. The `App` component acts as a layout, while `Home`, `About`, and `Contact` are nested routes rendered via the `Outlet`.

- **`RouterProvider`**: Supplies the router to the app, handling the transitions and route matching.

### 4. Tailwind Styling:

- **Navbar**: The navigation bar is styled using Tailwind CSS (`bg-gray-800`, `text-white`, `p-4`), and hover styles are applied to `NavLink` items (`hover:text-blue-400`).
- **Active Link**: When a link is active, it's styled with the `text-blue-400` class.

### Step 4: Run the Application

To start your Vite development server, run:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser to see the app. You should be able to navigate between the **Home**, **About**, and **Contact** pages using the navbar.

### Summary:

1. **Router Setup**: Using `createBrowserRouter` and `RouterProvider` to manage routing.
2. **Navbar with `NavLink`**: Created a responsive navigation bar that highlights active routes.
3. **Page Components**: `Home`, `About`, and `Contact` components are rendered based on the route.
4. **Tailwind CSS**: Used Tailwind for styling the layout and active/inactive states of the navigation links.