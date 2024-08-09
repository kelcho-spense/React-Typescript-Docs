import Joke from './components/Joke';
import jokesData from "./db/data.json";
import './App.scss'

function App() {
  return (
    <div className='app'>
    {
      // //filtering the jokes with rating > 4
      // jokesData && jokesData.filter((joke) => joke.rating > 4).map((joke, index) =>
      //   <Joke joke={joke} key={index} />
      // )

      jokesData && jokesData.map((joke, index) =>
        <Joke joke={joke} key={index} />
      )
    }
  </div>
  )
}

export default App
