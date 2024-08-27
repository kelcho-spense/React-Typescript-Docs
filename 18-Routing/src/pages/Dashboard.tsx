import Layout from "../Dashboard/Layout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    return (
        <div className="h-screen">
            <Navbar />
            <Layout />
            <Footer />
        </div>

    );
}  