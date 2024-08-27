import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminLogin from '../features/login/admin/AdminLogin';

function Admin() {
    return (
        <>
            <Navbar />
            <Container className='bg-base-200 grid grid-cols-1 place-items-center gap-2 min-h-screen max-h-fit-content min-w-[100%]'>
                <AdminLogin />
            </Container>
            <Footer />
        </>
    )
}

export default Admin