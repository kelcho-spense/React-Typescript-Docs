import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'

function Home() {
  return (
    <>
      <Navbar />
      <Container className='min-h-screen'>
        <div>Home</div>
      </Container>
      <Footer />

    </>
  )
}

export default Home