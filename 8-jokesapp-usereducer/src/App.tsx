import { useReducer } from 'react';
import './App.scss';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

interface IAction {
  type: 'ADD_JOKE' | 'DELETE_JOKE' | 'DECREASE_RATE' | 'INCREMENT_RATE' | 'UPDATE_JOKE';
  payload: Joke | number; // accommodate both Joke and number types
}

const initialJokes: Joke[] = [
  {
    id: 1,
    joke: 'What do you call a very small valentine? A valen-tiny!',
    rate: 3,
  },
  {
    id: 2,
    joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!',
    rate: 2,
  },
  {
    id: 3,
    joke: 'A termite walks into the bar and says, "Where is the bar tender?"',
    rate: 1,
  },
  {
    id: 4,
    joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
    rate: 0,
  },
  {
    id: 5,
    joke: 'Why was the math book sad? Because it had too many problems.',
    rate: 0,
  },
];

const reducerJokes = (state: Joke[], action: IAction): Joke[] => {
  switch (action.type) {
    case 'ADD_JOKE':
      return [...state, action.payload as Joke];
    case 'INCREMENT_RATE':
      return state.map((joke) => {
        if (joke.id === action.payload) {
          return { ...joke, rate: joke.rate + 1 };
        }
        return joke;
      });
    case 'DECREASE_RATE':
      return state.map((joke) => {
        if (joke.id === action.payload) {
          return { ...joke, rate: joke.rate - 1 };
        }
        return joke;
      });
    case 'DELETE_JOKE':
      return state.filter((joke) => joke.id !== action.payload);
    case 'UPDATE_JOKE':
      return state.map((joke) => {
        if (joke.id === (action.payload as Joke).id) {
          return { ...joke, joke: (action.payload as Joke).joke };
        }
        return joke;
      });
    default:
      return state;
  }
};

function App() {
  const [jokes, dispatch] = useReducer(reducerJokes, initialJokes);
  // const [editJokeId, setEditJokeId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newJoke: Joke = { id: jokes.length + 1, joke: e.currentTarget[0].value, rate: 0 };
    dispatch({ type: 'ADD_JOKE', payload: newJoke });
  };

  const increaseRate = (id: number) => {
    dispatch({ type: 'INCREMENT_RATE', payload: id });
  };
  const decreaseRate = (id: number) => {
    dispatch({ type: 'DECREASE_RATE', payload: id });
  };
  const deleteJoke = (id: number) => {
    dispatch({ type: 'DELETE_JOKE', payload: id });
  };
  const updateJoke = (id: number) => {
    const newJokeText = prompt('Edit your joke:', jokes.find(joke => joke.id === id)?.joke || '');
    if (newJokeText !== null && newJokeText.trim() !== '') {
      dispatch({ type: 'UPDATE_JOKE', payload: { id, joke: newJokeText, rate: 0 } });
    }
  };

  return (
    <div className='container'>
      <h2>Jokes for you 💀</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button type='submit'>Add Joke</button>
      </form>
      <div className="jokes">
        {jokes && jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
          <div key={joke.id} className='joke'>
            <div className='joke-text'>{joke.joke}</div>
            <div className='text'>{joke.rate}</div>
            <div className='action-buttons'>
              <button onClick={() => updateJoke(joke.id)}>edit</button>
              <button onClick={() => deleteJoke(joke.id)}>delete</button>
            </div>
            <div className="joke-buttons">
              <button onClick={() => increaseRate(joke.id)}>👍</button>
              <button onClick={() => decreaseRate(joke.id)}>👎</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;