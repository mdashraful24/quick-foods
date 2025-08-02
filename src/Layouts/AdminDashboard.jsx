import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaUtensils, FaClipboardList, FaTruck, FaHome, FaComments, FaBlogger } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white p-4 shadow-lg">
                <div className="flex items-center justify-center mb-8 mt-4">
                    <FaUtensils className="text-2xl mr-2" />
                    <h1 className="text-xl font-bold">Quick Foods</h1>
                </div>

                <nav className="space-y-2">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaHome className="mr-3" />
                        Dashboard Overview
                    </NavLink>

                    <NavLink
                        to="/admin/manageUsers"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaUsers className="mr-3" />
                        Manage Users
                    </NavLink>

                    <NavLink
                        to="/admin/pendingCaterings"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaClipboardList className="mr-3" />
                        Pending Caterings
                    </NavLink>

                    <NavLink
                        to="/admin/manageProviders"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaClipboardList className="mr-3" />
                        Manage Providers
                    </NavLink>

                    <NavLink
                        to="/admin/orderToDelivery"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaTruck className="mr-3" />
                        Orders & Deliveries
                    </NavLink>

                    <NavLink
                        to="/admin/blogField"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaComments className="mr-3" />
                        Write Blog
                    </NavLink>

                    <NavLink
                        to="/admin/blogList"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaBlogger className="mr-3" />
                        Manage Blogs
                    </NavLink>

                    {/* Divider */}
                    <div className="bg-white h-[1.5px] my-4"></div>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                    >
                        <FaHome className="mr-3" />
                        Home
                    </NavLink>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="bg-white flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;