# Pure and inpure Components

To create a simplified explanation with code examples of the two topics shown in the images, I'll break them down as follows:

## Impure Component
![impure components](impure components.png)

- An impure component is one where the same input doesn't always produce the same output. This inconsistency often arises when the component modifies external states or variables, leading to unexpected behavior.

#### **Code Example:**

```javascript
// This is an impure component example

let count = 0; // External variable

function ImpureComponent() {
  count = count + 1; // Modifying external state
  return <h2>Cup {count}</h2>; // Returns different output each time
}

// Usage:
// <ImpureComponent /> // First render: Cup 1
// <ImpureComponent /> // Second render: Cup 2 (Wrong output)
```

**Why it’s bad:**
- The component produces different outputs (like "Cup 2", "Cup 4") even if it is called with the same input, which makes debugging and testing difficult.

## Pure Component

![pure components](pure components.png)

- A pure component always returns the same output for the same input. It doesn't modify external states or variables, ensuring consistency and predictability in the application.

#### **Code Example 1 :**

```javascript
// This is a pure component example

function PureComponent({ data }) {
  return <h2>Cup {data}</h2>; // Always returns the same output for the same input
}

// Usage:
// <PureComponent data={2} /> // Always renders: Cup 2
// <PureComponent data={2} /> // Always renders: Cup 2 (Consistent output)
```

**Why it’s good:**
- Pure components are easier to reason about, test, and debug. They behave predictably, making your application more reliable.

#### Key Takeaways:
1. **Impure Components** modify external state and produce different outputs with the same input. Avoid using them as they make your application unpredictable.
2. **Pure Components** always return the same output for the same input, ensuring consistency and reliability.

Certainly! Here's how you can implement the same pure component with counting functionality in TypeScript:

### **Code Example 2 :**

```javascript
import React, { useState } from 'react';

const PureComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0); // Local state with type annotation

  const incrementCount = (): void => {
    setCount(count + 1); // Updates the count state
  };

  return (
    <div>
      <h2>Cup {count}</h2>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

// Usage:
// <PureComponent />
```

### Explanation:
1. **Type Annotation with `useState`:** In TypeScript, we annotate the type of the `count` state as `number` by using `useState<number>(0)`. This ensures that `count` is always treated as a number.
2. **Function Component Type Annotation (`React.FC`):** The `PureComponent` is typed as a functional component using `React.FC`. This provides type-checking for props and ensures that the component adheres to React's functional component structure.
3. **Increment Function:** The `incrementCount` function has a return type of `void`, indicating that it doesn't return any value.

### Usage:
- Initially, `count` is `0`.
- Clicking the "Increment" button will increase the count by 1, and the component will re-render with the updated count.
