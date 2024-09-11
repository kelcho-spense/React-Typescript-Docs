# 12. Form Management with React Hook Form & Zod

We are going to create a simple **Login** and **Signup** app using **React Hook Form v6**, **Zod** for form validation, and **React Router DOM** for routing in a **React + Vite + TypeScript** project.

---

1. [Why Use React Hook Form](#why-use-react-hook-form)
2. [Project Setup](#project-setup)
3. [Setting Up React Hook Form](#setting-up-react-hook-form)
4. [Form Validation with Zod](#form-validation-with-zod)
5. [Creating the Login and Signup Pages](#creating-the-login-and-signup-pages)
6. [Routing with React Router DOM](#routing-with-react-router-dom)

---

### Why Use React Hook Form?

**React Hook Form (RHF)** is a powerful form management library for React. Here's why you should consider using it:

1. **Minimal Re-renders**: React Hook Form reduces re-renders compared to other form libraries like `Formik`.
2. **Better Performance**: It’s built on uncontrolled components, meaning the form values are managed by the DOM rather than React state, making it faster.
3. **Simple API**: React Hook Form’s API is intuitive and integrates well with form validation libraries like **Zod** or **Yup**.
4. **TypeScript Support**: It has first-class support for TypeScript, making it a great choice for type-safe form handling.

---

## Project Setup

### 1. Create a Vite Project with React and TypeScript

Start by creating a Vite project with TypeScript support.

```bash
npm create vite@latest react-hook-form-app --template react-ts
cd react-hook-form-app
npm install
```

### 2. Install Required Packages

We'll need the following packages:
- **react-hook-form**: To handle forms.
- **@hookform/resolvers**: To integrate Zod with React Hook Form.
- **zod**: For form validation.
- **react-router-dom**: For page routing.

```bash
npm install react-hook-form @hookform/resolvers zod react-router-dom
```

---

## Setting Up React Hook Form

### 1. Basic Form Setup with React Hook Form

First, let's set up a simple login form using `react-hook-form`. We'll use the `useForm` hook to manage form state and submit.

```Javascript
// src/pages/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define a Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Define form values based on schema
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data); // Handle login logic here
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className="border p-2 w-full"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
```

### Explanation:
- **Zod schema (`loginSchema`)**: Defines the validation rules for the login form.
- **useForm**: The hook from React Hook Form that initializes the form and handles validation.
- **zodResolver**: This is used to integrate Zod validation with React Hook Form.
- **errors**: Contains any validation errors, which are displayed under each input.

---

## Form Validation with Zod

### 2. Setting Up Signup Page with Zod

Let's create a signup page similar to the login page, but with additional validation rules like password confirmation.

```Javascript
// src/pages/Signup.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define a Zod schema for Signup form validation
const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password confirmation is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

// Define form values based on schema
type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data); // Handle signup logic here
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className="border p-2 w-full"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="border p-2 w-full"
          />
          {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
```

### Explanation:
- **Zod schema (`signupSchema`)**: Validates the email, password, and confirmPassword fields. It also checks that the passwords match using `.refine()`.
- **useForm**: Similar setup as the login page, but now it handles additional validation for password confirmation.

---

## Routing with React Router DOM

### 1. Setting Up Routes

We will use **React Router DOM** to handle routing between the login and signup pages.

```Javascript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Adding Navigation Links

You can add navigation links to switch between the **Login** and **Signup** pages.

```Javascript
// src/App.tsx
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex justify-center space-x-4 mt-10">
      <Link to="/login" className="text-blue-500">Login</Link>
      <Link to="/signup" className="text-blue-500">Signup</Link>
    </div>
  );
};

export default App;
```

---