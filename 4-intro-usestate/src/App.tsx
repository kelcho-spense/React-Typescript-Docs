import { useState } from 'react'
import './App.css'

function App() {
const [number,setNumber] = useState<number>(0)

const increase = () => setNumber(number + 1) ;


  return (
    <>
      <h3>intro to useState</h3>
      <button onClick={increase}>+</button>
      <button onClick={() => setNumber(number - 1)}>-</button>
      <div>{number}</div>
    </>
  )
}

export default App
