# Getting started with Tailwind

Framework-specific guides that cover our recommended approach to installing Tailwind CSS in a number of popular environments.

Here’s a guide to get started with **Tailwind CSS** and **Vite** using different frontend frameworks such as **React**, **Vue**, and **Svelte**. This guide will walk you through installing Tailwind CSS, configuring it, and setting up your project.
[tailwind docs](https://tailwindcss.com/)
---

### **1. Install Tailwind CSS with Vite**

#### **Using React**

1. **Create your Vite project**:
   Start by creating a new Vite project with React.

   ```bash
   npm create vite@latest my-project -- --template react
   cd my-project
   ```

2. **Install Tailwind CSS**:
   Install `tailwindcss`, `postcss`, and `autoprefixer`, and generate the configuration files.

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure Tailwind**:
   Open the `tailwind.config.js` file and specify the paths to your template files.

   ```Javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. **Add Tailwind Directives**:
   Add Tailwind’s base, components, and utilities directives to your CSS file.

   Create or update your `src/index.css` file:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Run Your Project**:
   Start the development server:

   ```bash
   npm run dev
   ```

6. **Start using Tailwind CSS**:
   Start using Tailwind utility classes in your React components, like so:

   ```Javascript
   export default function App() {
     return (
       <h1 className="text-3xl font-bold underline">
         Hello world!
       </h1>
     )
   }
   ```

---

### **Conclusion**
By following the steps in this guide, you can easily integrate **Tailwind CSS** into any Vite project using **React**. After completing the setup, you can take full advantage of Tailwind’s utility-first approach to rapidly style your application, and customize it with ease through the `tailwind.config.js` file.