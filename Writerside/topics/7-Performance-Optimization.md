# 9. Performance Optimization Hooks

## Memoization in React

Memoization is a technique that helps improve the performance of your React application by caching the results of expensive operations and reusing them when the same inputs occur. In React, memoization can be used in various contexts, such as optimizing component re-renders, caching computed values, and avoiding unnecessary function recreations.

## What is Memoization?

Memoization is a form of caching that stores the results of function calls based on their inputs. If the function is called again with the same inputs, the memoized result is returned instead of recomputing the result. This can significantly improve performance, especially in applications where computations are expensive or where re-renders should be minimized.

### Example of Basic Memoization

In a general JavaScript context, memoization might look like this:

```javascript
const memoize = (fn) => {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
};

const expensiveCalculation = (num) => {
    console.log('Computing...');
    return num * 2;
};

const memoizedCalculation = memoize(expensiveCalculation);

console.log(memoizedCalculation(5)); // Computing... 10
console.log(memoizedCalculation(5)); // 10 (cached result, no computing)
```

### In React, memoization typically refers to optimizing component re-renders and function dependencies using `useCallback`, `useMemo`, and `React.memo`.

## useCallback Hook

### What is `useCallback`?

`useCallback` is a React hook that returns a memoized version of a callback function. It's primarily used to optimize performance by preventing unnecessary re-renders in components that rely on reference equality, especially when passing callback functions to child components.

### Syntax

```javascript
const memoizedCallback = useCallback(
    () => {
        // Your callback logic here
    },
    [dependencies], // Array of dependencies
);
```

### Detailed Example: Preventing Unnecessary Re-renders

Let's build a more practical example where `useCallback` is essential. Imagine a scenario where you have a parent component that manages a list of items and a child component that adds a new item to that list.

#### Example Code

```Typescript
import React, { useState, useCallback } from 'react';

// Child component to add a new item
const AddItem: React.FC<{ onAddItem: () => void }> = React.memo(({ onAddItem }) => {
    console.log('AddItem rendered');
    return <button onClick={onAddItem}>Add Item</button>;
});

// Parent component managing the list of items
const ItemList: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
    const [count, setCount] = useState(0);

    // Memoized callback to add a new item to the list
    const handleAddItem = useCallback(() => {
        setItems((prevItems) => [...prevItems, `Item ${prevItems.length + 1}`]);
    }, []); // Empty dependency array: this callback doesn't change

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Counter</button>
            <AddItem onAddItem={handleAddItem} />
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
```

### Explanation

- **Without `useCallback`:**
    - If we did not use `useCallback` for `handleAddItem`, this function would be recreated every time `ItemList` re-renders, causing the `AddItem` component to re-render unnecessarily even if the function logic hasn't changed.

- **With `useCallback`:**
    - By wrapping `handleAddItem` in `useCallback`, we memoize the function, ensuring that it only gets recreated if its dependencies change. In this example, the dependencies array is empty, so `handleAddItem` is only created once and remains the same across re-renders of `ItemList`. This prevents unnecessary re-renders of `AddItem`, optimizing performance.

### Practical Impact

- **Performance Optimization:**
    - This pattern is particularly useful in scenarios where the parent component re-renders frequently (e.g., due to state changes unrelated to the callback). By ensuring that the callback remains stable across renders, you avoid unnecessary re-rendering of child components that depend on that callback.

- **Preventing Child Re-renders:**
    - In the provided example, the `AddItem` component only re-renders if the `handleAddItem` callback changes. Because of `useCallback`, it doesn't change, keeping the `AddItem` component from re-rendering unnecessarily, which is confirmed by the `console.log` statement in the `AddItem` component.

### Summary

Using `useCallback` can be a powerful optimization technique in React, especially when dealing with components that rely on reference equality for performance. It ensures that functions are only recreated when necessary, helping to prevent unnecessary rendering and improving the overall efficiency of your application.

## useMemo Hook

### What is `useMemo`?

`useMemo` is a React hook that returns a memoized value. It is used to optimize expensive computations that should not be recalculated unless their dependencies change.

### Syntax

```javascript
const memoizedValue = useMemo(() => {
    // Expensive computation here
    return computedValue;
}, [dependencies]); // Array of dependencies
```

### Example: Optimizing Expensive Computations

```javascript
import React, { useState, useMemo } from 'react';

const ExpensiveComponent: React.FC<{ count: number }> = ({ count }) => {
    const computeExpensiveValue = (num: number) => {
        console.log('Computing expensive value...');
        for (let i = 0; i < 1000000000; i++) {} // Simulate expensive computation
        return num * 2;
    };

    const memoizedValue = useMemo(() => computeExpensiveValue(count), [count]);

    return <p>Computed Value: {memoizedValue}</p>;
};

const ParentComponent: React.FC = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
            />
            <ExpensiveComponent count={count} />
        </div>
    );
};

export default ParentComponent;
```

### Explanation:
- **Without `useMemo`**: The `computeExpensiveValue` function would run on every render, which could significantly degrade performance.
- **With `useMemo`**: The expensive computation is only recalculated when `count` changes, which optimizes performance.

## React.memo for Component Optimization

### What is `React.memo`?

`React.memo` is a higher-order component (HOC) that optimizes functional components by memoizing them. It prevents unnecessary re-renders by comparing the props passed to the component. If the props have not changed, React skips rendering the component and reuses the last rendered result.

### Syntax

```javascript
const MemoizedComponent = React.memo(MyComponent);
```

### Example: Preventing Unnecessary Re-renders with `React.memo`

```javascript
import React, { useState } from 'react';

const ChildComponent: React.FC<{ name: string }> = ({ name }) => {
    console.log('Child rendered');
    return <p>{name}</p>;
};

const MemoizedChild = React.memo(ChildComponent);

const ParentComponent: React.FC = () => {
    const [name, setName] = useState('John Doe');
    const [age, setAge] = useState(30);

    return (
        <div>
            <button onClick={() => setAge(age + 1)}>Increment Age</button>
            <MemoizedChild name={name} />
        </div>
    );
};

export default ParentComponent;
```

### Explanation:
- **Without `React.memo`**: The `ChildComponent` would re-render every time `ParentComponent` re-renders, even if `name` hasn't changed.
- **With `React.memo`**: `MemoizedChild` only re-renders if its props (`name` in this case) change. This prevents unnecessary renders and improves performance.

### Custom Comparison in `React.memo`

By default, `React.memo` performs a shallow comparison of the component’s props. You can also provide a custom comparison function if you need to customize the logic:

```javascript
const MemoizedChild = React.memo(
    ChildComponent,
    (prevProps, nextProps) => prevProps.name === nextProps.name
);
```

### Summary

- **Memoization**: A technique to cache and reuse results of expensive operations to optimize performance.
- **`useCallback` Hook**: Memoizes a function to prevent its recreation on every render, useful for preventing unnecessary re-renders of child components that depend on the function.
- **`useMemo` Hook**: Memoizes a computed value to prevent recomputation unless dependencies change, optimizing performance in components with expensive calculations.
- **`React.memo`**: A higher-order component that memoizes the result of a functional component render to avoid unnecessary re-renders, especially when props haven't changed.

