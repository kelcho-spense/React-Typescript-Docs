import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: number
}
const initialState: CounterState = {
    value: 0
}

//immer library is used to mutate the state directly
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1   // state.value = state.value + 1
        },
        decrement: (state) => {
            state.value -= 1   // state.value = state.value - 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload   // ie state = 0 + 5 where 5 is the payload
        },
        reset : () => initialState,  //reset the state to initial state
    }
})


export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

export default counterSlice.reducer //registering the reducer with the store