import { Outlet } from 'react-router-dom'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import SideNav from './SideNav'
import Card from './Card'
import Footer from '../../components/Footer'
import Nav from './Nav'

function AdminDashboard() {
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

export default AdminDashboard