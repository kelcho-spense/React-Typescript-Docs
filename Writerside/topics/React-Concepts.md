# React Concepts

![react_concepts](react_concepts.png)
- Reconciliation: This is the process React uses to update the user interface (UI) efficiently. When something changes in your app (like a piece of data), React compares the new state with the old state and only updates the parts of the UI that need to change. This comparison is what "reconciliation" refers to.
- Composition: React encourages breaking down your UI into small, reusable pieces called components. Composition is the process of combining these components to create more complex UIs. Instead of creating one big component, you compose multiple smaller ones.
- Error Boundaries: These are special components in React that catch errors in any components below them in the component tree. This prevents the whole app from crashing if something goes wrong in a small part of your UI.

![react_rendering](react_rendering.png)
## Rendering in React
- Rendering in React is the process of taking your React components and turning them into something that users can see on their screen (usually HTML). The code example shown (a simple function returning JSX) illustrates how you define a React component. When this component is rendered, React translates the JSX into HTML and updates the browser's DOM to reflect this.

![React_rendering_steps](React_rendering_steps.png)

## React Rendering Steps
- **Step 1**: State Change?
React checks if any part of your application's state has changed. If it has, React creates a new "virtual" version of the UI (Virtual DOM).
- **Step 2**: React "diffs"
React compares the new Virtual DOM with the previous version (this process is called "diffing"). It identifies what has changed.
- **Step 3**: Reconciliation with the DOM
React updates only the parts of the actual DOM that need to change, based on the diffing process. This is the reconciliation step, where React ensures that the UI reflects the latest state efficiently without re-rendering the entire page.

These images illustrate core concepts and the process by which React efficiently updates and renders UIs, ensuring that changes are reflected quickly and with minimal performance impact.