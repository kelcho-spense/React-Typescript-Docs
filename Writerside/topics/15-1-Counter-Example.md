# 15.1 Counter Example

Sure! Let's update your counter example to use the latest version of Zustand. As of now, the latest stable version is 4.5.5¹.

### 1. Counter Example with Zustand and TypeScript

First, let's build a simple counter app using Zustand, which will allow you to increment, decrement, and reset the counter.

#### Step 1: Create a Counter Store with Zustand

**File: `src/store/useCounterStore.ts`**

```typescript
import { create } from 'zustand';

// Define the counter store state interface
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Zustand store for managing the counter
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

**Explanation:**

- The Zustand store has three methods (`increment`, `decrement`, `reset`) and a `count` state.
- The `set` function modifies the store’s state.

#### Step 2: Create the Counter Component

**File: `src/components/Counter.tsx`**

```typescript
import React from 'react';
import { useCounterStore } from '../store/useCounterStore';

const Counter: React.FC = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          onClick={increment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

**Explanation:**

- We use `useCounterStore` to access the `count`, `increment`, `decrement`, and `reset` methods.
- The component renders buttons to interact with the counter.

#### Step 3: Bring It Together in App Component

**File: `src/App.tsx`**

```typescript
import React from 'react';
import Counter from './components/Counter';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Zustand Counter App</h1>
      <Counter />
    </div>
  );
};

export default App;
```

#### Step 4: Run the App

Start your app by running:

```bash
npm run dev
```


### Summary:
- The **counter** example helped introduce Zustand's basic store management and state update.

Feel free to ask any questions or