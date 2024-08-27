import { useReducer } from 'react'
import './App.css'
import { reducerCount } from './Reducers'

function App() {

  const [number, dispatch] = useReducer(reducerCount, 0);  //

  const handleIncrease = () => dispatch({ type: 'INCREMENT' })

  return (
    <>
      <h2>Counter App : useReducer</h2>
      <div className='btns'>
        <button onClick={handleIncrease}>+</button>
        <span>{number}</span>
        <button onClick={() => dispatch({ type: 'DECREASE' })}>-</button>
      </div>
    </>
  )
}

export default App
