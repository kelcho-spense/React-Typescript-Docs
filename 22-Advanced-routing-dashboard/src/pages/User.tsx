import Container from '../components/Container';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserLogin from '../features/login/user/UserLogin';

function User() {
    return (
        <>
            <Navbar />
            <Container className='bg-base-200 grid grid-cols-1 place-items-center gap-2 min-h-screen max-h-fit-content'>
                <UserLogin />
            </Container>
            <Footer />
        </>
    )
}

export default User