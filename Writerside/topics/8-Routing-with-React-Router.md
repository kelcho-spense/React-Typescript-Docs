# 11. Routing with React Router

React Router DOM v6 is a popular library for handling routing in React applications. It allows developers to create navigation between different pages or views within a single-page application (SPA), manage complex routing logic, and define how components should be rendered based on the current URL.

### What is React Router DOM v6?

React Router DOM v6 is the latest version of React Router, offering several improvements and changes over previous versions. It simplifies the API, introduces new hooks like `useNavigate`, and provides enhanced support for nested routes, layouts, and protected routes.

### Key Features:
- **Declarative Routing**: Define routes and their corresponding components declaratively in your React components.
- **Nested Routes**: Support for nested routes allows more complex and modular routing structures.
- **Dynamic Routing**: Ability to define routes dynamically based on application state or user roles.
- **Hooks API**: New hooks like `useNavigate` and `useParams` provide easier ways to interact with the routing system.
- **Route Guards**: Support for protected and private routes, allowing you to control access based on authentication or user roles.

---

### Basic Routing with 3 Pages

Let's start with a simple example of setting up basic routing with three pages: Home, About, and Contact.

#### Step 1: Install React Router DOM

First, install React Router DOM in your project:

```bash
npm install react-router-dom@6
```

#### Step 2: Set Up Basic Routing

Create a simple routing structure with three pages: Home, About, and Contact.

```tsx
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home: React.FC = () => <h2>Home Page</h2>;
const About: React.FC = () => <h2>About Page</h2>;
const Contact: React.FC = () => <h2>Contact Page</h2>;

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default App;
```

### Explanation:
- **`<Router>`**: Wraps the application and enables routing.
- **`<Routes>` and `<Route>`**: Define the different routes and their corresponding components.
- **`<Link>`**: Used to create navigational links that change the URL and render the corresponding component.

---

### Complex Routing Example

Let's extend the routing to include a dashboard with nested routes, use `useNavigate` for programmatic navigation, and demonstrate `Link`, `NavLink`, and `Outlet`.

#### Step 1: Define Routes with Nested Structure

```tsx
// Dashboard.tsx
import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><NavLink to="profile" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>Profile</NavLink></li>
                    <li><NavLink to="settings">Settings</NavLink></li>
                </ul>
            </nav>
            <Outlet /> {/* Renders the nested routes */}
        </div>
    );
};

export default Dashboard;
```

```tsx
// Profile.tsx
import React from 'react';

const Profile: React.FC = () => <h3>Profile Page</h3>;

export default Profile;
```

```tsx
// Settings.tsx
import React from 'react';

const Settings: React.FC = () => <h3>Settings Page</h3>;

export default Settings;
```

#### Step 2: Set Up the Routes in `App.tsx`

```tsx
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const App: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
                <button onClick={() => handleNavigation('/about')}>Go to About</button>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
```

### Explanation:
- **Nested Routes**: The `Dashboard` component uses an `Outlet` to render nested routes like `Profile` and `Settings`.
- **`NavLink`**: A special version of `Link` that adds styling based on whether the link is active.
- **`useNavigate`**: A hook that allows you to programmatically navigate to a different route.

### Step 3: Scroll Restoration

React Router v6 supports scroll restoration automatically, but you can explicitly manage it using the `ScrollRestoration` component.

```tsx
import { ScrollRestoration } from 'react-router-dom';

// Use ScrollRestoration in your component tree
const App: React.FC = () => {
    return (
        <Router>
            <ScrollRestoration />
            {/* Other components and routes */}
        </Router>
    );
};
```

---

### Protected Routes & Private Routes with Role-Based Routing

For more advanced applications, you may want to protect certain routes based on user authentication or roles. React Router v6 allows you to create protected routes by wrapping your components with logic that checks for authentication or user roles.

#### Step 1: Create a Protected Route Component

```tsx
// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, redirectPath = '/login' }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
```

#### Step 2: Use Protected Route in Your Routing

```tsx
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import About from './About';
import Login from './Login'; // Create this component
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
    const isAuthenticated = true; // Example authentication status

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/dashboard/*" element={<Dashboard />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
```

#### Step 3: Role-Based Routing

You can extend the `ProtectedRoute` component to support role-based access.

```tsx
// RoleBasedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface RoleBasedRouteProps {
    isAuthenticated: boolean;
    allowedRoles: string[];
    userRole: string;
    redirectPath?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ isAuthenticated, allowedRoles, userRole, redirectPath = '/login' }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />; // Unauthorized page
    }

    return <Outlet />;
};

export default RoleBasedRoute;
```

#### Usage Example:

```tsx
<Route element={<RoleBasedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']} userRole={userRole} />}>
    <Route path="/admin" element={<AdminDashboard />} />
</Route>
```

### Explanation:
- **ProtectedRoute**: A component that wraps around your protected routes to check if a user is authenticated before granting access.
- **Role-Based Routing**: You can extend the logic to check if a user has the appropriate role before accessing certain routes.

---

### Summary

- **React Router DOM v6**: A powerful library for

managing routing in React applications, with support for declarative routing, nested routes, and complex state management.
- **Basic Routing**: Set up simple navigation between pages using `Routes` and `Route`.
- **Complex Routing**: Utilize nested routes, `useNavigate`, `Link`, `NavLink`, and `Outlet` for more advanced routing structures.
- **Scroll Restoration**: Automatically or manually manage scroll positions during navigation.
- **Protected Routes**: Implement protected and role-based routes to secure parts of your application.
