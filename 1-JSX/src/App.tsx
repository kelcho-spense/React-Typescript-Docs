import './App.css'

function App() {
  const name = 'Kevin Comba'
  const moreDetails = {
    age: 31,
    height: 1.7,
  }


  return (
    <>
      <h3>hello world my name is {name}</h3>
      <p>My age is {moreDetails.age}</p>
      <p>My height is {moreDetails.height}</p>
      <p>Favorite Programming Languages</p>
      <ul style={{ backgroundColor: 'black', color: 'pink' }}>
        <li>Javascript</li>
        <li>C#</li>
        <li>Python</li>
      </ul>
    </>
  )
}

export default App
