import Navbar from "./Common/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    return (
        <div>
            <Helmet>
                <title>Home | Quick Foods</title>
            </Helmet>

            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Home;