# Functional vs. Class Components
![building blocks of apps](image.png)

### **React Functional Components**

React functional components are the backbone of modern React applications. They offer a straightforward way to define components and are preferred over class components for their simplicity and performance benefits. Let’s explore functional components in more detail.

### **How do Components Differ from Normal Functions?**

While functional components in React are defined using JavaScript functions, they differ from regular functions in a few significant ways:

1. **Return Value**:
   - **Normal Function**: Typically returns a primitive value (like a number, string, or object).
   - **Functional Component**: Returns JSX, which React transforms into HTML to render on the screen.

2. **Side Effects**:
   - **Normal Function**: Executes its code and returns a result; typically stateless and effect-free.
   - **Functional Component**: Can manage state (using hooks like `useState`) and handle side effects (using hooks like `useEffect`).

3. **Usage**:
   - **Normal Function**: Invoked directly in the code, typically to perform calculations or process data.
   - **Functional Component**: Used as a part of the React component tree and rendered by React to produce a user interface.

### **Ways to Write Functional Components**

React functional components can be written in two main ways: using a normal function declaration or using an arrow function.

#### **1. Normal Function Declaration**

This is the traditional way to define a function in JavaScript.

```Javascript
import React from 'react';

function Greeting() {
  return <h1>Hello, World!</h1>;
}

export default Greeting;
```

**Features:**
- Uses the `function` keyword.
- Can be named or anonymous (though in React, it's typically named for clarity).
- `this` refers to the global context unless bound.

#### **2. Arrow Function**

Arrow functions offer a shorter syntax and are often used in modern React applications.

```Javascript
import React from 'react';

const Greeting = () => {
  return <h1>Hello, World!</h1>;
};

export default Greeting;
```

**Features:**
- Uses the `=>` syntax.
- `this` refers to the context in which the function is defined, not where it is invoked (important for handling state and props in React).
- Typically more concise, especially for simple components.

### **Exporting and Importing Components**

React allows you to export and import components using either named or default exports. The choice between them depends on how you want to organize and use your components.

#### **1. Default Export**

A module can have only one default export. The `default` keyword is used, and when importing, the name of the import can be different from the exported name.

```Javascript
// Greeting.js
import React from 'react';

const Greeting = () => <h1>Hello, World!</h1>;

export default Greeting;
```

```Javascript
// App.js
import GreetingComponent from './Greeting'; // Can be named anything

function App() {
  return <GreetingComponent />;
}

export default App;
```

**Key Points:**
- Only one default export per file.
- Import can be named anything.

#### **2. Named Export**

You can have multiple named exports in a module. The import statement must match the export's name.

```Javascript
// utils.js
export const Greeting = () => <h1>Hello, World!</h1>;
export const Farewell = () => <h1>Goodbye, World!</h1>;
```

```Javascript
// App.js
import { Greeting, Farewell } from './utils';

function App() {
  return (
    <>
      <Greeting />
      <Farewell />
    </>
  );
}

export default App;
```

**Key Points:**
- Multiple named exports per file.
- Must use the exact name when importing.

### What Are Class Components in React?

Class components are one of the fundamental ways to define components in React. They are ES6 classes that extend from `React.Component`, and they allow you to define components with state and lifecycle methods.

#### Key Characteristics of Class Components:
- **State Management:** Class components have a built-in mechanism to manage local state using `this.state`.
- **Lifecycle Methods:** Class components provide access to lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`, which allow you to run code at specific points during the component’s lifecycle.
- **`this` Keyword:** In class components, you often need to bind methods to the component instance (`this`) to ensure they have the correct context.
- **Render Method:** Every class component must have a `render` method, which returns the JSX that defines the component's UI.

### Example of a Class Component

Here’s a simple example of a counter implemented as a class component in React with TypeScript:

```typescript
import React, { Component } from 'react';

// Define the state interface
interface CounterState {
  count: number;
}

// Create a class component
class Counter extends Component<{}, CounterState> {
  constructor(props: {}) {
    super(props);
    // Initialize the state in the constructor
    this.state = {
      count: 0, // Set the initial count value
    };
  }

  // Method to increment the count
  incrementCount = (): void => {
    this.setState((prevState) => ({
      count: prevState.count + 1, // Increase the count by 1
    }));
  };

  // Method to decrement the count
  decrementCount = (): void => {
    this.setState((prevState) => ({
      count: prevState.count - 1, // Decrease the count by 1
    }));
  };

  // Render method to display the component
  render() {
    return (
      <div>
        <h2>Counter: {this.state.count}</h2>
        <button onClick={this.incrementCount}>Increment</button>
        <button onClick={this.decrementCount}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
```

### Why Class Components Are Not Used as Much Anymore

Over time, React has introduced new features that have made functional components more powerful and preferred over class components. Here’s why class components are becoming less common:

#### 1. **Introduction of Hooks:**
- **React Hooks** were introduced in React 16.8 and allow you to use state and other React features in functional components. With hooks like `useState`, `useEffect`, `useContext`, etc., you can manage state, side effects, and more within functional components, which previously could only be done in class components.
- Hooks provide a simpler, more intuitive API for managing component logic compared to the often cumbersome and verbose class component approach.

#### 2. **Simplicity and Readability:**
- Functional components are generally more straightforward and easier to read than class components. They require less boilerplate code since there’s no need to manage the `this` context or bind methods.
- The logic in functional components tends to be more concise, leading to cleaner and more maintainable code.

#### 3. **Performance Considerations:**
- Functional components can be optimized more easily through techniques like memoization using `React.memo` and hooks like `useMemo` and `useCallback`. This can lead to better performance, especially in large applications.
- Since functional components are just functions, they can take advantage of React’s optimization techniques more effectively.

#### 4. **Consistency and Modern Practices:**
- The React community has largely adopted functional components as the standard for writing new React code. This shift has also influenced tooling, libraries, and best practices to favor functional components.
- As a result, developers are encouraged to use functional components for new development to align with modern React patterns and community standards.

### Summary:

- **Class components** are a traditional way to create stateful components in React, using ES6 classes. They are still supported in React but are gradually being replaced by functional components with hooks.
- **Functional components with hooks** are now the preferred approach in React due to their simplicity, readability, and ease of use. They allow you to write less code while achieving the same functionality, making your components more maintainable and efficient.
- **Why the Shift?** The shift away from class components is primarily due to the introduction of hooks, which brought powerful new capabilities to functional components, making them a more attractive option for modern React development.
