import Companies from "../components/Companies"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Container from "../components/Container"
import JoinUs from "../components/JoinUs"
import Benefits from "../components/Benefits"
import { benefitOne, benefitTwo } from "../utils/data"
import Footer from "../components/Footer"
const Home = () => {
  return (
    <div>
      <Container className="bg-base-200 flex flex-col gap-6">
        <Navbar />
        <Hero />
        <Companies />
        <JoinUs />
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        <Footer />
      </Container>
    </div>
  )
}

export default Home