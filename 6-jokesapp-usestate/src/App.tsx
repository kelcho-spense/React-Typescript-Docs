import { useState } from 'react'
import './App.scss'
interface Joke {
  id: number;
  joke: string;
  rate: number;
}

function App() {
  const [jokes, setJokes] = useState<Joke[]>([
    {
      id: 1,
      joke: 'What do you call a very small valentine? A valen-tiny!',
      rate: 3
    },
    {
      id: 2,
      joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!',
      rate: 2
    },
    {
      id: 3,
      joke: 'A termite walks into the bar and says, "Where is the bar tender?"',
      rate: 1
    },
    {
      id: 4,
      joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
      rate: 0
    },
    {
      id: 5,
      joke: 'Why was the math book sad? Because it had too many problems.',
      rate: 0
    }
  ])

  const updateRate = (id: number, rate: number) => {
    const newJoke = jokes.map((joke) => {
      if (joke.id == id) {
        return { ...joke, rate: rate }
      }
      return joke
    })
    setJokes(newJoke)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const newJoke: Joke = { id: jokes.length + 1, joke: e.target[0].value, rate: 0 };
    setJokes([...jokes, newJoke])
  }


  return (
    <div className='container'>
      <h2>Jokes for you 💀</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button type='submit'>AddJoke</button>
      </form>
      <div className="jokes">
        {
          // jokes && jokes.map((joke) => {
          //   return (
          //     <div key={joke.id} className='joke'>
          //       <div className='joke-text'>{joke.joke}</div>
          //       <div className='text'>{joke.rate}</div>
          //       <div className="joke-buttons">
          //         <button onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
          //         <button onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
          //       </div>
          //     </div>
          //   )
          // })
          jokes && jokes.sort((a,b) => (b.rate - a.rate)).map((joke) => {
            return (
              <div key={joke.id} className='joke'>
                <div className='joke-text'>{joke.joke}</div>
                <div className='text'>{joke.rate}</div>
                <div className="joke-buttons">
                  <button onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
                  <button onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default App
