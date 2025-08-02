import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar/Navbar";
import Footer from "../components/Footer";

const AuthLayout = () => {
    return (
        <div>
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

export default AuthLayout;