# Introduction to TypeScript in React


![React TypeScript.png](React_TypeScript.png)
TypeScript is a statically typed superset of JavaScript that provides better tooling and helps catch errors early during development. Using TypeScript with React improves code quality and readability, especially in large projects.

## Using TypeScript
TypeScript is a popular way to add type definitions to JavaScript codebases. Out of the box, TypeScript supports JSX and you can get full React Web support by adding `@types/react` and `@types/react-dom` to your project.

## TypeScript with React Components 
Writing TypeScript with React is very similar to writing JavaScript with React. The key difference when working with a component is that you can provide types for your component’s props. These types can be used for correctness checking and providing inline documentation in editors.

### Button Component with TS

```Javascript
function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
```
![Ts button.png](Ts_button.png)


