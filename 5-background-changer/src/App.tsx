import { useState } from 'react'
import './App.scss'
import Button from './components/Button'

function App() {
  const [bg, setBg] = useState<string>("");
  const changeBackground = (color: string) => {
    setBg(color);
  }
  console.log(bg)

  return (
    <div className='app' style={{ backgroundColor: bg ? bg : "rgba(87, 33, 0, 0.5)" }}>
      <div className='buttons'>
        <Button color="red" changeBGFunc={changeBackground} />
        <Button color="green" changeBGFunc={changeBackground} />
        <Button color="blue" changeBGFunc={changeBackground} />
        <Button color="Reset" changeBGFunc={() => setBg("")} />
      </div>
    </div>
  )
}

export default App
