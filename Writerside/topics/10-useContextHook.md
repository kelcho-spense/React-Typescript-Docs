# 10. useContext API

The `useContext` API in React is a hook that allows you to access the value of a context within a functional component. The Context API itself provides a way to share values (like data or functions) between components without having to pass props manually at every level of the component tree, thereby avoiding "prop drilling."

### Why Use useContext?

- **Avoid Prop Drilling**: Instead of passing props down through several levels, you can place data in a context that any component can access directly.
- **Global State Management**: It’s useful for managing state that needs to be accessible by multiple components across your application, such as user authentication status, theme settings, or language preferences.
- **Cleaner Code**: By centralizing shared data, you can reduce the complexity of your component structure and make your codebase more maintainable.

### Setting Up useContext API

Setting up `useContext` involves creating a context, providing a value for that context, and then consuming that context value in your components. Here's how you can do it step by step:

### Step 1: Create a Context

First, you need to create a context using the `createContext` function. This context will hold the data or functions that you want to share across components.

```typescript
import React, { createContext } from 'react';

// Create a context with a default value (optional)
const MyContext = createContext<string | undefined>(undefined);

export default MyContext;
```

### Step 2: Create a Provider Component

Next, you'll need a provider component that wraps the parts of your application that need access to the context. The provider component will supply the value for the context.

```typescript
import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState('Hello, World!');

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
```

### Explanation:
- **`MyContext.Provider`**: The `Provider` component supplies the context value to its children. Any component inside this provider can access the context value using `useContext`.
- **`value`**: The value passed to the `Provider` is what will be accessible to any component consuming this context.

### Step 3: Consume the Context

Finally, you can consume the context value in any component that is a child of the provider by using the `useContext` hook.

```typescript
import React, { useContext } from 'react';
import MyContext from './MyContext';

const MyComponent: React.FC = () => {
    const value = useContext(MyContext);

    return <p>The context value is: {value}</p>;
};

export default MyComponent;
```

### Explanation:
- **`useContext` Hook**: The `useContext` hook is used to access the value of the context. The context value is retrieved based on the nearest provider above the component in the tree.

### Step 4: Wrap Your Application with the Provider

To make the context available to all components that need it, wrap the root component (or a part of your component tree) with the provider component.

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import MyProvider from './MyProvider';
import MyComponent from './MyComponent';

const App: React.FC = () => {
    return (
        <MyProvider>
            <MyComponent />
        </MyProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### Full Example

Let's see all the pieces together in a full example.

```typescript
// MyContext.tsx
import { createContext } from 'react';

const MyContext = createContext<string | undefined>(undefined);

export default MyContext;

// MyProvider.tsx
import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState('Hello, World!');

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;

// MyComponent.tsx
import React, { useContext } from 'react';
import MyContext from './MyContext';

const MyComponent: React.FC = () => {
    const value = useContext(MyContext);

    return <p>The context value is: {value}</p>;
};

export default MyComponent;

// App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import MyProvider from './MyProvider';
import MyComponent from './MyComponent';

const App: React.FC = () => {
    return (
        <MyProvider>
            <MyComponent />
        </MyProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### Explanation:
- **Centralized State**: The context value (`value` in this case) is centralized in the `MyProvider` component.
- **Access Anywhere**: Any component wrapped by `MyProvider` can access this value using `useContext`, without needing to pass the value through props.

### Summary

- **`useContext` API**: Allows you to create and consume context in your components, providing a powerful tool for avoiding prop drilling and managing global state.
- **Setting Up**:
    1. Create a context with `createContext`.
    2. Provide the context value using a `Provider` component.
    3. Consume the context value using the `useContext` hook.
- **Benefits**: Simplifies state management and makes your code more maintainable, especially in applications where many components need to access the same data.

Certainly! Let's explore how the `useContext` API can be combined with both `useState` and `useReducer` to manage global state in a React application. I'll create two meaningful examples to illustrate each approach.

---

## Example 1: useContext with useState

### Scenario: Managing User Authentication State

In this example, we will create a simple user authentication system using `useContext` and `useState`. The goal is to manage the authentication state (e.g., logged-in user) globally, so that any component in the application can access or update this state.

### Step 1: Create a Context and a Provider Component

```typescript
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user context
interface UserContextType {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a Provider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    const login = (username: string) => {
        setUser(username);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
```

### Step 2: Create Components to Consume the Context

```typescript
import React from 'react';
import { useContext } from 'react';
import UserProvider, { UserContext } from './UserProvider';

const Navbar: React.FC = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error('Navbar must be used within a UserProvider');
    }

    const { user, logout } = userContext;

    return (
        <div>
            <p>Welcome, {user ? user : 'Guest'}!</p>
            {user && <button onClick={logout}>Logout</button>}
        </div>
    );
};

const LoginPage: React.FC = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error('LoginPage must be used within a UserProvider');
    }

    const { login } = userContext;

    const handleLogin = () => {
        login('John Doe');
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login as John Doe</button>
        </div>
    );
};

// Main App component
const App: React.FC = () => {
    return (
        <UserProvider>
            <Navbar />
            <LoginPage />
        </UserProvider>
    );
};

export default App;
```

### Explanation:

- **Context & State**: The `UserContext` provides a global state that holds the current user and two functions (`login` and `logout`) to update this state.
- **Consuming the Context**: Components like `Navbar` and `LoginPage` consume the `UserContext` to access and modify the user state. This avoids prop drilling and makes the state easily accessible across the app.

## Example 2: useContext with useReducer

### Scenario: Managing a Todo List with Complex State

In this example, we'll manage a more complex state, such as a todo list, using `useContext` and `useReducer`. This approach is beneficial when state logic involves multiple actions and requires more structured updates.

### Step 1: Create a Context, Reducer, and a Provider Component

```typescript
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define the shape of a todo item
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Define the shape of the context
interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
}

// Define the available actions for the reducer
type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number };

// Reducer function to handle state updates
const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { id: state.length + 1, text: action.payload, completed: false },
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        default:
            return state;
    }
};

// Create the TodoContext
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Create a Provider component
const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const addTodo = (text: string) => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const toggleTodo = (id: number) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
```

### Step 2: Create Components to Consume the Context

```typescript
import React, { useState } from 'react';
import { useContext } from 'react';
import TodoProvider, { TodoContext } from './TodoProvider';

const TodoList: React.FC = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error('TodoList must be used within a TodoProvider');
    }

    const { todos, toggleTodo } = todoContext;

    return (
        <ul>
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                    onClick={() => toggleTodo(todo.id)}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    );
};

const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error('AddTodo must be used within a TodoProvider');
    }

    const { addTodo } = todoContext;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

// Main App component
const App: React.FC = () => {
    return (
        <TodoProvider>
            <AddTodo />
            <TodoList />
        </TodoProvider>
    );
};

export default App;
```

### Explanation:

- **Context & Reducer**: The `TodoContext` provides a global state that is managed by the `todoReducer`. This state includes a list of todos and functions (`addTodo` and `toggleTodo`) that dispatch actions to the reducer.
- **State Management**: The reducer function handles state transitions based on the actions dispatched, making it easier to manage complex state logic.
- **Component Interaction**: Components like `TodoList` and `AddTodo` consume the `TodoContext` to interact with the global todo list. This allows for centralized state management without prop drilling.

---

### Summary

- **useContext with useState**: A simple and straightforward way to manage global state when the state is relatively simple (e.g., user authentication). It avoids prop drilling and keeps the state accessible across the application.
- **useContext with useReducer**: Ideal for managing more complex state with multiple actions and state transitions (e.g., a todo list). The reducer pattern allows for clear and predictable state management.

Both approaches help you avoid prop drilling and make your components more modular and maintainable. Depending on the complexity of the state you need to manage, you can choose between `useState` and `useReducer` as the underlying state management tool with `useContext`.