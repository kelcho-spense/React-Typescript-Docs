import Form from "./Form";
import { useContext } from "react"
import { emailContext } from "../pages/Home"
export default function Body() {
  const { email, setEmail } = useContext(emailContext)
  return (
    <div className="container mx-auto px-4 min-h-lvh">
      <Form setEmail={setEmail} />
      curent email: {email}
    </div>
  )
}

