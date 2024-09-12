# 5. Conditional Rendering in React

Conditional rendering in React allows you to control what gets rendered based on certain conditions or states. This is a common requirement when building dynamic UIs, and TypeScript adds an extra layer of safety by ensuring that your conditions and render logic are type-checked.

## Basic Conditional Rendering

The most straightforward way to conditionally render content in React is by using JavaScript's conditional (ternary) operator or logical operators like `&&`.

### 1. Using the Ternary Operator

The ternary operator is a concise way to conditionally render one of two possible outputs.

```javascript
import React, { useState } from 'react';

const TernaryExample: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <div>
            {isLoggedIn ? (
                <p>Welcome back!</p>
            ) : (
                <p>Please log in.</p>
            )}
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                Toggle Login State
            </button>
        </div>
    );
};

export default TernaryExample;
```

### Explanation:
- **Ternary Operator**: `{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}` renders the "Welcome back!" message if `isLoggedIn` is `true`, otherwise it renders "Please log in."

### 2. Using the Logical AND (`&&`) Operator

The `&&` operator can be used to render content only when a condition is true.

```javascript
import React, { useState } from 'react';

const AndOperatorExample: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    return (
        <div>
            {isAdmin && <p>You have admin privileges.</p>}
            <button onClick={() => setIsAdmin(!isAdmin)}>
                Toggle Admin Status
            </button>
        </div>
    );
};

export default AndOperatorExample;
```

### Explanation:
- **Logical AND (`&&`)**: `{isAdmin && <p>You have admin privileges.</p>}` renders the message only if `isAdmin` is `true`. If `isAdmin` is `false`, nothing is rendered.

## More Complex Conditional Rendering

When conditions are more complex, or when you need to render multiple elements based on different conditions, it's better to use `if-else` statements or switch cases inside your component.

### 3. Using `if-else` Statements

```javascript
import React, { useState } from 'react';

const IfElseExample: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    const renderContent = () => {
        if (status === 'loading') {
            return <p>Loading...</p>;
        } else if (status === 'success') {
            return <p>Data loaded successfully!</p>;
        } else if (status === 'error') {
            return <p>Failed to load data.</p>;
        } else {
            return null;
        }
    };

    return (
        <div>
            {renderContent()}
            <button onClick={() => setStatus('loading')}>Set Loading</button>
            <button onClick={() => setStatus('success')}>Set Success</button>
            <button onClick={() => setStatus('error')}>Set Error</button>
        </div>
    );
};

export default IfElseExample;
```

### Explanation:
- **`if-else` Statements**: The `renderContent` function checks the current `status` and returns the corresponding JSX based on the condition. This approach is helpful when multiple conditions need to be checked.

### 4. Using `switch` Statements

When you have many possible states, a `switch` statement can be a more readable alternative to multiple `if-else` conditions.

```javascript
import React, { useState } from 'react';

const SwitchExample: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return <p>Loading...</p>;
            case 'success':
                return <p>Data loaded successfully!</p>;
            case 'error':
                return <p>Failed to load data.</p>;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderContent()}
            <button onClick={() => setStatus('loading')}>Set Loading</button>
            <button onClick={() => setStatus('success')}>Set Success</button>
            <button onClick={() => setStatus('error')}>Set Error</button>
        </div>
    );
};

export default SwitchExample;
```

### Explanation:
- **`switch` Statement**: Similar to `if-else`, but more structured for handling multiple conditions based on the `status`.

## TypeScript Best Practices for Conditional Rendering

### 1. Use TypeScript’s Union Types

When handling multiple states, using TypeScript’s union types can help ensure that you cover all possible cases. This is particularly useful in complex components.

```javascript
type Status = 'loading' | 'success' | 'error';

const Example: React.FC = () => {
    const [status, setStatus] = useState<Status>('loading');

    // TypeScript will enforce you to handle all possible cases of 'status'
    const renderContent = () => {
        switch (status) {
            case 'loading':
                return <p>Loading...</p>;
            case 'success':
                return <p>Data loaded successfully!</p>;
            case 'error':
                return <p>Failed to load data.</p>;
            default:
                // We should never hit this case, so we can return null or throw an error
                return null;
        }
    };

    return <div>{renderContent()}</div>;
};
```

### 2. Avoid Rendering Unnecessary Elements

Use conditional rendering to avoid rendering unnecessary elements. This can improve performance, especially when dealing with large or complex UIs.

```javascript
const Example: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    return (
        <div>
            {isVisible && <p>This will only render if isVisible is true.</p>}
        </div>
    );
};
```

### 3. Ensure All Paths Return Valid JSX

TypeScript will help ensure that all paths in your conditional logic return valid JSX. Make sure that your components don't return `undefined` or other invalid values.

```javascript
const Example: React.FC<{ condition: boolean }> = ({ condition }) => {
    return (
        <div>
            {condition ? <p>Condition is true</p> : <p>Condition is false</p>}
        </div>
    );
};
```

### 4. Use Fragment (`<></>`) or Null for Empty Renders

If a condition results in rendering nothing, use an empty fragment `<>...</>` or `null` to make it explicit that no content will be rendered.

```javascript
const Example: React.FC<{ condition: boolean }> = ({ condition }) => {
    return (
        <div>
            {condition ? <p>Condition is true</p> : null}
        </div>
    );
};
```

Alternatively, you can use an empty fragment:

```javascript
const Example: React.FC<{ condition: boolean }> = ({ condition }) => {
    return (
        <div>
            {condition ? <p>Condition is true</p> : <></>}
        </div>
    );
};
```

### 5. Consider Type Safety When Using `defaultProps`

If you're using default props in your components, ensure that your conditional rendering logic considers the default values, as TypeScript will type-check based on these defaults.

```javascript
type ExampleProps = {
    isVisible?: boolean;
};

const Example: React.FC<ExampleProps> = ({ isVisible = false }) => {
    return (
        <div>
            {isVisible ? <p>Visible</p> : <p>Not visible</p>}
        </div>
    );
};
```

### 6. Prefer Early Returns for Simpler Conditional Logic

When dealing with complex conditional rendering, consider using early returns in your function to simplify the logic.

```javascript
const Example: React.FC<{ isLoading: boolean; hasError: boolean }> = ({
    isLoading,
    hasError,
}) => {
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (hasError) {
        return <p>Error occurred!</p>;
    }

    return <p>Data loaded successfully!</p>;
};
```

### Summary:

- **Conditional Rendering**: Use ternary operators, logical operators, `if-else`, and `switch` statements to render content conditionally.
- **TypeScript Best Practices**:
    - Use union types to ensure all possible states are handled.
    - Avoid unnecessary renders for better performance.
    - Always return valid JSX or `null` for empty renders.
    - Consider default props and early returns to simplify logic.

---
