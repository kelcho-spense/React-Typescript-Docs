import './App.css'
import useFetch from './hooks/useFetch'
import { ClockLoader } from 'react-spinners'
interface TUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
  phone: string;
  website: string;
  company: {
    name: string;
  }

}

function App() {
  //useEffect that will fetch data from the API
  const [fetchedData, loading, error] = useFetch<TUser[] | null>("https://jsonplaceholder.typicode.com/users/1");

  return (
    <>
      <div className='users'>
        {
          loading ? <ClockLoader color="#d66136" loading size={50} /> : (
            error ? <div>Error: {error.message}</div> : (
              fetchedData ? (
              fetchedData.map((user: TUser) => {
                  return (
                    <div className='user' key={user.id}>
                      <p>Name: {user.name}</p>
                      <p>userName: {user.username}</p>
                      <p>Email: {user.email}</p>
                      <p>Address: {user.address.street}</p>
                      <p>{`lat: ${user.address.geo.lat} & longitude: ${user.address.geo.lng}`}</p>
                      <p>Phone: {user.phone}</p>
                      <p>Website: {user.website}</p>
                      <p>Company: {user.company.name}</p>
                    </div>
                  )
                })
              ) : (<div> 💀no data</div >)
            )
          )
        }
      </div>
    </>
  )
}

export default App
