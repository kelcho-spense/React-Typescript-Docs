# React + TypeScript + Redux
## Setting Up the Project
1. Create a Vite project with React and TypeScript:

```bash
pnpm create vite@latest my-redux-app --template react-ts
cd my-redux-app
pnpm install
```

2. Install Redux Toolkit and React-Redux:

``` bash
pnpm add @reduxjs/toolkit react-redux
```

## Setting Up Redux

1. Create a Redux slice:

Create a new folder src/features/counter and inside it, create a file counterSlice.ts:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```
2. Create the Redux store:

In the src/app folder, create a file store.ts:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
3. Provide the Redux store to your app:

In src/main.tsx, wrap your App component with the Provider from react-redux:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```


## Create the Counter Component

1. Create a Counter component:

In the src/features/counter folder, create a file Counter.tsx:

```typescript
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './counterSlice'
import { RootState, AppDispatch } from '../../app/store'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch: AppDispatch = useDispatch()
    return (
        <div>
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
                <div>
                    <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
                </div>
            </div>
        </div>
    )
}
```