# Setting Up Redux Toolkit in a React Project

### **2. Setting Up Redux Toolkit in a React Project**

To understand Redux Toolkit and how it simplifies the process of integrating Redux into your React project, we will walk through a step-by-step example by building a **To-Do List Application**. The application will allow you to add, delete, and update tasks, and it will store and manage the state using Redux Toolkit.

We will also use **Vite** to set up the project, **TypeScript** for type safety, and **Tailwind CSS** for styling.

#### **Project Overview: To-Do List with Redux Toolkit**
The project will cover:
- Setting up a React + TypeScript project with Vite.
- Configuring Redux Toolkit.
- Creating Redux slices and actions.
- Dispatching actions from components.
- Connecting components to the Redux store.
- Using Tailwind CSS to style the application.

### **Step 1: Setting Up the React Project with Vite**

1. **Initialize the Project**:
   Start by creating a new Vite project with TypeScript:

   ```bash
   npm create vite@latest todo-app -- --template react-ts
   cd todo-app
   npm install
   ```

2. **Install Redux Toolkit and React-Redux**:
   Next, install `@reduxjs/toolkit` and `react-redux`:

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

3. **Install Tailwind CSS**:
   To add Tailwind CSS, follow the official installation guide:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

   Then, configure Tailwind by updating the `tailwind.config.js` file and `index.css`:

   ```javascript
   // tailwind.config.js
   module.exports = {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

   ```css
   /* src/index.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Start the development server**:
   Now that the project is set up, run the Vite server:

   ```bash
   npm run dev
   ```

---

### **Step 2: Setting Up Redux Toolkit**

Now that the project is set up, let's configure Redux Toolkit to manage the state for our to-do app.

1. **Create a Redux Store**:
   Inside your `src` directory, create a new folder called `store` to hold your Redux logic.

   ```bash
   mkdir src/store
   ```

   In `src/store/index.ts`, create the Redux store using Redux Toolkit's `configureStore` function.

   ```javascript
   // src/store/index.ts
   import { configureStore } from '@reduxjs/toolkit';

   const store = configureStore({
     reducer: {},
   });

   // Export types to be used in your application
   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;

   export default store;
   ```

2. **Wrap the React App with the Redux Provider**:
   We need to provide the Redux store to our entire React app. This is done by wrapping the app with `Provider` from `react-redux`.

   In `src/main.tsx`:

   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import './index.css';
   import App from './App';
   import { Provider } from 'react-redux';
   import store from './store';

   ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
     <React.StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
     </React.StrictMode>
   );
   ```

   Now the Redux store is available throughout the entire app.

---

### **Step 3: Creating a Slice for To-Do Management**

In Redux Toolkit, a **slice** is a collection of reducers and actions for a specific feature of your application. Here, we’ll create a `todoSlice` to handle adding, deleting, and updating tasks.

1. **Create the `todoSlice`**:
   In `src/store/todoSlice.ts`, define the slice for handling tasks.

   ```javascript
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   interface Todo {
     id: number;
     text: string;
     completed: boolean;
   }

   interface TodoState {
     todos: Todo[];
   }

   const initialState: TodoState = {
     todos: [],
   };

   const todoSlice = createSlice({
     name: 'todos',
     initialState,
     reducers: {
       addTodo: (state, action: PayloadAction<string>) => {
         const newTodo: Todo = {
           id: Date.now(),
           text: action.payload,
           completed: false,
         };
         state.todos.push(newTodo);
       },
       deleteTodo: (state, action: PayloadAction<number>) => {
         state.todos = state.todos.filter((todo) => todo.id !== action.payload);
       },
       toggleTodo: (state, action: PayloadAction<number>) => {
         const todo = state.todos.find((todo) => todo.id === action.payload);
         if (todo) {
           todo.completed = !todo.completed;
         }
       },
     },
   });

   export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
   export default todoSlice.reducer;
   ```

2. **Add the `todoSlice` to the Store**:
   Now, integrate this slice into the Redux store. Open `src/store/index.ts` and add the reducer.

   ```javascript
   import { configureStore } from '@reduxjs/toolkit';
   import todoReducer from './todoSlice';

   const store = configureStore({
     reducer: {
       todos: todoReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;

   export default store;
   ```

---

### **Step 4: Connecting Components to the Redux Store**

Now that Redux is set up, let’s connect the React components to the Redux store. We will create two main components:
1. A form to add new to-dos.
2. A list of to-dos that allows you to delete or toggle them.

1. **Add the To-Do Form Component**:
   Create a new file `src/components/TodoForm.tsx` for the form that will dispatch the `addTodo` action.

   ```javascript
   import { useState } from 'react';
   import { useDispatch } from 'react-redux';
   import { addTodo } from '../store/todoSlice';
   import { AppDispatch } from '../store';

   const TodoForm = () => {
     const [text, setText] = useState('');
     const dispatch = useDispatch<AppDispatch>();

     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       if (text) {
         dispatch(addTodo(text));
         setText('');
       }
     };

     return (
       <form onSubmit={handleSubmit} className="mb-4">
         <input
           type="text"
           value={text}
           onChange={(e) => setText(e.target.value)}
           placeholder="Add a new task"
           className="border p-2 mr-2 rounded"
         />
         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
           Add Todo
         </button>
       </form>
     );
   };

   export default TodoForm;
   ```

2. **Add the To-Do List Component**:
   Create `src/components/TodoList.tsx` for displaying the list of to-dos and dispatching `deleteTodo` and `toggleTodo` actions.

   ```javascript
   import { useSelector, useDispatch } from 'react-redux';
   import { RootState, AppDispatch } from '../store';
   import { deleteTodo, toggleTodo } from '../store/todoSlice';

   const TodoList = () => {
     const todos = useSelector((state: RootState) => state.todos.todos);
     const dispatch = useDispatch<AppDispatch>();

     return (
       <ul>
         {todos.map((todo) => (
           <li key={todo.id} className="flex items-center mb-2">
             <input
               type="checkbox"
               checked={todo.completed}
               onChange={() => dispatch(toggleTodo(todo.id))}
               className="mr-2"
             />
             <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
               {todo.text}
             </span>
             <button
               onClick={() => dispatch(deleteTodo(todo.id))}
               className="bg-red-500 text-white p-1 rounded ml-2"
             >
               Delete
             </button>
           </li>
         ))}
       </ul>
     );
   };

   export default TodoList;
   ```

---

### **Step 5: Bringing Everything Together**

Now, combine everything in the `App.tsx` file to render the form and the to-do list.

```javascript
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">To-Do List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
```

---

### **Step 6: Running the Application**



Start your application with:

```bash
npm run dev or pnpm run dev
```

---
