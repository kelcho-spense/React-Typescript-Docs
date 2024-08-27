import './App.css'
import UserComponent from './components/UserComponent'

function App() {
  const user = {
    name: 'John Doe',
    email: 'john@mail.com',
    age: 25,
    address: {
      street: {
        name: 'Main St',
        number: 123      
      },
      city: 'Boston',
      state: 'MA'
    },
  }

  return (
    <>
      <UserComponent {...user} />
    </>
  )
}

export default App
