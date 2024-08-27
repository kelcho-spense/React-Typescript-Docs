import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { increment, decrement, incrementByAmount, reset } from "./counterSlice"
import { persistedStore } from "../../app/store";

function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)  //get the current state
    const dispatch: AppDispatch = useDispatch()

    const incrementFunc = () => {
        dispatch(increment())
    }

    const incrementByAmountFunc = () => {
        dispatch(incrementByAmount(5))
    }
    const resetPersistedState = async () => {
        await persistedStore.purge()  //wipe clean the persisted state
    }
    const resetState = () => {
        dispatch(reset())  //reset the state to initial state
    }
    return (
        <div>
            <span>{count}</span> <br />
            <button onClick={incrementFunc}>Increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <button onClick={incrementByAmountFunc}>increment By amount</button>
            <button onClick={resetState}>Reset state</button>
            <button onClick={resetPersistedState}>ResetPersisted State</button>
        </div>
    )
}

export default Counter