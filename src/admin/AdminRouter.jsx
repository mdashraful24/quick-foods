import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Footer from "../components/Footer";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar/Navbar";

const AdminRouter = ({ children }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      {/* <header>
        <Navbar />
      </header> */}

      <main>
        <div className="mt-20">
          <h1 className="font-bold text-center text-3xl">Admin Panels</h1>
          <div className="w-11/12 mx-auto text-center justify-center items-center lg:flex gap-5">
            <Link to="/admin" className="btn">
              Admins
            </Link>
            <Link to="/admin/addAdmin" className="btn">
              Add Admin
            </Link>
            <Link to="/admin/pendingCaterings" className="btn">
              Pending Caterings
            </Link>
            <Link to="/admin/orderToDelivery" className="btn">
              View Orders
            </Link>
          </div>
        </div>

        <Outlet /> {/* This will render the nested routes */}
      </main>

      <Footer />
    </div>
  );
};

export default AdminRouter;