import './App.css'
import Personal from './components/Personal'
import Placeholder from './components/Placeholder'

function App() {
  const name = "kevin comba"
  const name2 = "Jane comba"
  const moreDetails = {
    age: 25,
    country: "Argentina",
    height: "1.70m"
  }
  let isLogged = true
  let langs = ["TypeScript", "Javascript", "C#", "Python"]
  function getTodaysDate() {
    return new Date().toLocaleDateString()
  }

  return (
    <>
      to day is : {getTodaysDate()}
      <Placeholder w={600} h={400} />
      <Placeholder w={400} h={200} />
      <Placeholder w={200} h={100} />
      <Personal name={name} moreDetails={moreDetails} isLogged={isLogged} langs={langs} />
      <Personal name={name2} moreDetails={moreDetails} isLogged={isLogged} langs={langs} />

    </>
  )
}

export default App
