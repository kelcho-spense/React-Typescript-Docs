import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Body from "../components/Body"
import { useState, createContext } from "react"
//create context
export const emailContext = createContext({email: "", setEmail: (email: string) => {}})

const Home = () => {

  const [email, setEmail] = useState<string>("test@gmail.com");


  return (
    <div className="grid grid-cols-1 gap-6 content-between">
      <emailContext.Provider value={{email, setEmail}} >
        <Navbar />
        <Body />
        <Footer />
      </emailContext.Provider>
    </div>
  )
}

export default Home