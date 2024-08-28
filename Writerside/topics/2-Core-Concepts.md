# 2. Fundamental Core Concepts

Here’s a brief explanation of some fundamental concepts in React:

### **Props**
- **Definition**: Props, short for properties, are a mechanism for passing data from parent components to child components. They are immutable, meaning that once passed to a child component, they cannot be altered by that component.
- **Usage**: Props are used to render dynamic content in React components. For example, you can pass user data as props to display different information in a reusable UI component.

### **JSX**
- **Definition**: JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code directly within your JavaScript files. It makes the structure of React components easier to visualize.
- **Usage**: JSX allows you to create React elements using HTML syntax. React transforms these into JavaScript objects that are rendered to the DOM.

### **Composition**
- **Definition**: Composition is the process of building complex components by combining simpler ones. This allows for better code reuse and maintainability.
- **Usage**: In React, composition is used to nest components within each other, passing props as needed to create more complex UIs from simpler building blocks.

### **Functional vs Class Components**
- **Functional Components**: These are simple functions that return JSX. They are stateless by default but can manage state and side effects using hooks like `useState` and `useEffect`.
- **Class Components**: These are ES6 classes that extend `React.Component` and have additional features like lifecycle methods and local state management. However, with the introduction of hooks, functional components are now the preferred way of building React components.

### **Rendering Components**
- **Definition**: Rendering in React refers to the process of displaying React elements on the screen. React updates the DOM to reflect the current state of the components.
- **Usage**: Components are rendered initially when the React app loads, and re-rendered whenever the state or props of a component change, ensuring that the UI is always in sync with the underlying data.
