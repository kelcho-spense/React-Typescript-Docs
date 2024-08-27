
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

