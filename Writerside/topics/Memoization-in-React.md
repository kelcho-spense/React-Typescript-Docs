# Memoization in React

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

`useCallback` is a React hook that returns a memoized version of a callback function. It is particularly useful when passing callbacks to child components that rely on reference equality to prevent unnecessary re-renders.

### Syntax

```typescript
const memoizedCallback = useCallback(
    () => {
        // Your callback logic here
    },
    [dependencies], // Array of dependencies
);
```

### Example: Preventing Unnecessary Re-renders

```typescript
import React, { useState, useCallback } from 'react';

const ChildComponent: React.FC<{ onClick: () => void }> = React.memo(({ onClick }) => {
    console.log('Child rendered');
    return <button onClick={onClick}>Click me</button>;
});

const ParentComponent: React.FC = () => {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log('Button clicked');
    }, []); // Empty dependency array means this callback won't change

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <ChildComponent onClick={handleClick} />
        </div>
    );
};

export default ParentComponent;
```

### Explanation:
- **Without `useCallback`**: Every time `ParentComponent` re-renders, `handleClick` would be recreated, causing `ChildComponent` to re-render even if it didn't need to.
- **With `useCallback`**: `handleClick` is memoized and only recreated if its dependencies change. Since the dependencies are empty in this example, the function is not recreated, preventing unnecessary re-renders of `ChildComponent`.

## useMemo Hook

### What is `useMemo`?

`useMemo` is a React hook that returns a memoized value. It is used to optimize expensive computations that should not be recalculated unless their dependencies change.

### Syntax

```typescript
const memoizedValue = useMemo(() => {
    // Expensive computation here
    return computedValue;
}, [dependencies]); // Array of dependencies
```

### Example: Optimizing Expensive Computations

```typescript
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

```typescript
const MemoizedComponent = React.memo(MyComponent);
```

### Example: Preventing Unnecessary Re-renders with `React.memo`

```typescript
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

```typescript
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

