import Container from '../../components/Container'
import SideNav from './SideNav'
import Nav from './Nav'
import Card from './Card'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

function UserDashboard() {
  return (
    <>
      <Navbar />
      <Container className='flex max-h-fit min-h-screen bg-base-400 text-neutral-200' >
        <div className='min-w-fit bg-green-200 hidden md:block'>
          <SideNav />
        </div>
        <div className='flex flex-col min-w-[90%] '>
          <Nav />
          <Card className='h-fit'>
            <Outlet />
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default UserDashboard