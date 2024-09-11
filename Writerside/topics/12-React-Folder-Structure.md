# 13. React Folder Structure

---

# **How To Structure React Projects From Beginner To Advanced**

React is incredibly flexible, and its unopinionated nature can make it tricky to figure out how to structure your project. In this guide, we'll cover three different folder structures that can be used for different project sizes, organized from simple to advanced.

### **Preface**
All these folder structures apply to the files inside the `src` folder. The rest of the project can vary depending on the tools and libraries you're using, so I won't be covering anything outside the `src` directory.

---

## **1. Simple Folder Structure (Beginner)**

This structure is perfect for small React projects (less than 10-15 components) where simplicity is key. When starting a project, the first two folders you often create are `components` and `hooks`.

### **Folder Structure Example**

```bash
src
├── components
│   ├── Button.tsx
│   ├── FormInput.tsx
│   └── Home.tsx
├── hooks
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── __tests__
│   ├── Button.test.tsx
│   └── Home.test.tsx
├── App.tsx
├── index.tsx
└── index.css
```

### **Explanation:**
- **Components Folder**: All reusable components live here (e.g., `Button.tsx`, `FormInput.tsx`). This is the default folder for components.
- **Hooks Folder**: Contains all custom hooks used throughout your app (e.g., `useFetch.ts`, `useLocalStorage.ts`).
- **Tests Folder**: If you're writing tests, it's common to centralize them in one place (e.g., `Button.test.tsx`, `Home.test.tsx`).

### **Pros:**
- Simplicity. You can start fast without overhead.

### **Cons:**
- As the project grows, having all components in one folder can become difficult to manage.
- Doesn't account for assets (images, fonts), utilities, or contexts.

---

## **2. Intermediate Folder Structure**

As your project grows, you’ll likely need more structure, especially when you have multiple pages and more components. This structure is perfect for mid-sized projects.

### **Folder Structure Example**

```bash
src
├── assets
│   ├── images
│   │   └── logo.svg
│   └── styles
│       └── index.css
├── components
│   ├── form
│   │   └── Input.tsx
│   └── ui
│       ├── Button.tsx
│       └── Modal.tsx
├── context
│   └── AuthContext.tsx
├── data
│   └── constants.ts
├── hooks
│   ├── useAuth.ts
│   └── useFetch.ts
├── pages
│   ├── Home
│   │   ├── Home.tsx
│   │   └── __tests__
│   │       └── Home.test.tsx
│   └── Login
│       ├── Login.tsx
│       ├── LoginForm.tsx
│       └── useLogin.ts
├── utils
│   ├── formatDate.ts
│   └── apiHelper.ts
├── App.tsx
└── index.tsx
```

### **Explanation:**
- **Pages Folder**: Each page (e.g., `Home`, `Login`) has its own folder, including components, hooks, and tests specific to that page.
- **Components Folder**: Subfolders like `form` and `ui` help to organize your components (e.g., UI components, Form components).
- **Context Folder**: Stores React Context API files, making it easier to manage global state (e.g., `AuthContext.tsx`).
- **Hooks Folder**: Global hooks that are used across different pages are placed here.
- **Assets Folder**: Store images, CSS, and other static files.
- **Data Folder**: Contains static data like JSON or constants.
- **Utils Folder**: Stores utility functions like date formatters or API helpers.

### **Pros:**
- Easier to manage as the project grows.
- Good separation of concerns with components, pages, and hooks.

### **Cons:**
- If your project becomes too large, the pages folder might still become cluttered.

---

## **3. Advanced Folder Structure (Feature-Based)**

For larger, feature-heavy applications, this advanced structure divides the code into features, making it easier to manage complex apps and ensuring scalability.

### **Folder Structure Example**

```bash
src
├── assets
│   └── logo.svg
├── components
│   ├── form
│   │   └── Input.tsx
│   └── ui
│       └── Button.tsx
├── context
│   └── AuthContext.tsx
├── features
│   ├── authentication
│   │   ├── components
│   │   │   └── LoginForm.tsx
│   │   ├── hooks
│   │   │   └── useAuth.ts
│   │   ├── services
│   │   │   └── authService.ts
│   │   └── index.ts
│   ├── todos
│   │   ├── components
│   │   │   └── TodoItem.tsx
│   │   ├── services
│   │   │   └── todoService.ts
│   │   └── index.ts
├── hooks
│   └── useFetch.ts
├── layouts
│   └── Sidebar.tsx
├── lib
│   └── axiosInstance.ts
├── services
│   └── apiService.ts
├── utils
│   └── formatDate.ts
├── pages
│   ├── Home.tsx
│   └── Login.tsx
└── App.tsx
```

### **Explanation:**
- **Features Folder**: Group code by feature, such as `authentication` and `todos`. Each feature has its own `components`, `hooks`, and `services` folder, allowing for better organization and feature isolation.
    - **Components**: UI elements specific to that feature (e.g., `LoginForm.tsx` for authentication).
    - **Hooks**: Hooks only used within that feature (e.g., `useAuth.ts`).
    - **Services**: Any API-related logic specific to that feature.
- **Layouts Folder**: Contains components like `Sidebar.tsx`, `Navbar.tsx`, and other layout-related components.
- **Lib Folder**: Contains facades for external libraries such as Axios or React Router.
- **Services Folder**: Handles API interactions, shared across features.
- **Pages Folder**: Each page glues together different feature components, making it more straightforward to see the overall page structure.

### **Pros:**
- Great for scaling large applications with multiple features.
- Better separation of concerns, making it easier to maintain and extend features.
- Reduces clutter by organizing code into logical feature groups.

### **Cons:**
- Overhead complexity, which might be unnecessary for smaller projects.

---

## **Conclusion**

Choosing the right folder structure depends on the size and complexity of your project:

- **Simple Structure**: Best for small projects or early stages.
- **Intermediate Structure**: A good balance for mid-sized projects with multiple pages and components.
- **Advanced Structure**: Ideal for large, feature-heavy projects that require a high level of organization.

By gradually evolving your project structure from simple to advanced, you ensure scalability and maintainability without overcomplicating your project at the beginning.

---

This structure should help you better organize your React and TypeScript projects as they grow. Let me know if you'd like further customization or clarification on any points!