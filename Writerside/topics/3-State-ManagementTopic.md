# 3. Intro to Hooks

![5 types of hooks](5 types of hooks.png)

Certainly! Here’s the simplified explanation without the examples:

### 1. **State Hooks**
- **useState()**: Adds state to functional components, allowing you to manage local state.
- **useReducer()**: An alternative for more complex state logic, similar to how reducers work in state management libraries.

### 2. **Context Hooks**
- **useContext()**: Consumes context values within functional components, simplifying data sharing between components.

### 3. **Ref Hooks**
- **useRef()**: Creates a reference to a DOM element or stores a mutable value that persists across renders without triggering a re-render.

### 4. **Effect Hooks**
- **useEffect()**: Performs side effects in functional components, such as data fetching, interacting with the DOM, or setting up subscriptions.

### 5. **Performance Hooks**
- **useMemo()**: Memoizes a calculated value, re-computing it only when its dependencies change to optimize performance.
- **useCallback()**: Memoizes a function to prevent unnecessary re-creations of the function, useful for optimizing child components' performance.
