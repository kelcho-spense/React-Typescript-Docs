# 8. Custom Hooks

### Custom Hooks in React

Custom hooks are a powerful feature in React that allow you to encapsulate and reuse stateful logic across multiple components. They enable you to extract logic into a reusable function, which can then be used just like the built-in hooks provided by React.

### What Are Custom Hooks?

A custom hook is essentially a JavaScript function whose name starts with `use` and that can call other hooks. Custom hooks let you combine multiple built-in hooks like `useState`, `useEffect`, and `useRef` to create reusable logic that can be shared across different components. This leads to cleaner, more maintainable, and reusable code.

### Why Use Custom Hooks?

1. **Reusability**: Encapsulate logic that is shared across multiple components into a single, reusable hook.
2. **Separation of Concerns**: Keep your components clean by moving complex logic out of them.
3. **Abstraction**: Abstract away implementation details that aren't relevant to the component itself, allowing you to focus on the component's purpose.
4. **Testability**: Custom hooks can be tested independently, improving the overall testability of your application.

### Example 1: `useLocalStorage` Hook

The `useLocalStorage` hook allows you to synchronize a state variable with `localStorage`, so that the state persists even when the page is refreshed.

```javascript
import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    // Retrieve from localStorage or use the initial value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Failed to read from localStorage:", error);
            return initialValue;
        }
    });

    // Custom setter function to update state and localStorage
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // If the new value is a function, call it with the current state
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Failed to write to localStorage:", error);
        }
    };

    return [storedValue, setValue] as const;
}

// Usage Example
import React from 'react';

const ExampleComponent: React.FC = () => {
    const [name, setName] = useLocalStorage<string>('name', 'John Doe');

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Stored Name: {name}</p>
        </div>
    );
};

export default ExampleComponent;
```

### Explanation:
- **Custom Hook (`useLocalStorage`)**: This hook manages a piece of state that is synchronized with `localStorage`.
- **Generic Type `<T>`**: The hook is generic, meaning it can handle any type of data (`string`, `number`, `object`, etc.).
- **Persisting State**: The hook retrieves the initial value from `localStorage` (if available) and sets up a setter function that updates both the state and `localStorage`.

### Example 2: `useFetch` Hook

The `useFetch` hook abstracts away the logic for making an HTTP request and managing the corresponding loading, error, and data states.

```javascript
import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string, options?: RequestInit) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ data: null, loading: true, error: null });
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setState({ data: result, loading: false, error: null });
            } catch (error: any) {
                setState({ data: null, loading: false, error: error.message });
            }
        };

        fetchData();
    }, [url, options]);

    return state;
}

// Usage Example
import React from 'react';

interface User {
    id: number;
    name: string;
}

const UsersComponent: React.FC = () => {
    const { data, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {data?.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};

export default UsersComponent;
```

### Explanation:
- **Custom Hook (`useFetch`)**: The hook manages the fetching process, including loading, error handling, and storing the fetched data.
- **Generic Type `<T>`**: The hook is generic, allowing it to work with any type of data structure that you fetch.
- **Effect Dependency**: The `useEffect` hook runs the fetch operation whenever the `url` or `options` change.

### Best Practices for Custom Hooks

1. **Naming Convention**: Always start the name of your custom hook with `use` (e.g., `useFetch`, `useLocalStorage`). This helps React understand that the function is a hook, and it must follow the Rules of Hooks.

2. **Return Values**: Custom hooks can return any value, but they often return an array (like `useState`) or an object to provide multiple pieces of information (e.g., `data`, `loading`, `error`).

3. **Reusability**: Keep your custom hooks as generic and reusable as possible. This makes it easier to apply them in different parts of your application.

4. **Encapsulation**: Move complex logic out of your components and into custom hooks. This helps keep your components focused on rendering UI and handling user interaction.

5. **Testing**: Because custom hooks are just functions, you can and should test them independently from the components that use them.

### Summary

- **Custom Hooks**: Functions that allow you to encapsulate and reuse stateful logic across multiple components.
- **`useLocalStorage` Hook**: Synchronizes state with `localStorage`, persisting the state across page refreshes.
- **`useFetch` Hook**: Manages the data fetching process, including handling loading states and errors.
- **Best Practices**: Use descriptive names, ensure reusability, keep hooks generic, and always test them.
