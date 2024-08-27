import './App.scss'
import { useCallback, useRef, useState, useEffect } from 'react'

function App() {

  const [length, setLength] = useState<number>(8);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const passRef = useRef<HTMLTextAreaElement>(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) str += '0123456789';  //add numbers
    if (symbols) str += '!@#$%^&*()_+~`|}{[]:;?><,./-=';  //add special characters';

    for (let i = 1; i < length; i++) {
      const position = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(position)
    }
    setPassword(pass)
  }, [length, numberAllowed, symbols])

  //fired only once & when  length, numberAllowed, symbols changes
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbols])

  const copyPastToClipBoard = () => {
   window.navigator.clipboard.writeText(password)
   passRef.current?.select()
  }

  return (
    <div className='container'>
      <h2>Password Generator</h2>
      <div className="app">
        <div className="form">
          <textarea
            cols={30}
            rows={2}
            value={password}
            ref={passRef}
            readOnly
          ></textarea>
          <button type="button" onClick={copyPastToClipBoard}>Copy</button>
        </div>
        <div className="options">
          <div className="inputs">
            <input
              type="range"
              id='range'
              max={100}
              min={3}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label htmlFor="range">{length}</label>
          </div>
          <div className="inputs">
            <input
              type="checkbox"
              id='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="checkbox">Numbers</label>
          </div>
          <div className="inputs">
            <input
              type="checkbox"
              id='symbols'
              defaultChecked={symbols}
              onChange={() => setSymbols((prev) => !prev)}
            />
            <label htmlFor="symbols">Symbols</label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
