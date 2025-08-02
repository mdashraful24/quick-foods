import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Common/Navbar/Navbar";


const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user && user.email) {
        return (
            <div>
                <Navbar></Navbar>
                {children}
                <Footer></Footer>
            </div>
        )
    }
    else {
        return (
            // alert("To give review, Login first"),
            <Navigate to="/auth/login"></Navigate>
        );
    }
};

export default PrivateRoute;