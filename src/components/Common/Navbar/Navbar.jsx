import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hook/useAuth";
import { Link, useLocation } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import logo from '../../../assets/icon-1.png';
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const moreRef = useRef(null);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const isHomeRoute = location.pathname === "/";
  const isActiveRoute = (path) => location.pathname === path;

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setIsAdmin(res.data.role === "admin");
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAdmin(false);
        }
      }
    };
    fetchUserRole();
  }, [user, axiosSecure]);

  const moreOptions = [
    { name: "Blogs", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    ...(isAdmin ? [{ name: "Admin Panel", path: "/admin/dashboard" }] : [])
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      setIsAdmin(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logout successful!',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: '#f0fdf4',
        iconColor: '#16a34a',
        color: '#166534'
      });
      setIsProfileOpen(false);
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Logout failed',
        text: error.message || 'Failed to logout. Please try again.',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#fef2f2',
        iconColor: '#dc2626',
        color: '#991b1b'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 50);
      setIsNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isHomeRoute && !isScrolled ? "bg-transparent" : "bg-white bg-opacity-30 backdrop-blur-3xl"} ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"} ${!isHomeRoute ? "shadow-md" : ""}`}>
      <div className="container mx-auto flex justify-between items-center p-3">

        {/* Links */}
        <div className="space-x-8 text-xl hidden lg:flex items-center">
          <Link to="/" className={`${isActiveRoute("/") ? "text-red-600 font-bold" : isHomeRoute && !isScrolled ? "text-white" : "text-black"} hover:text-red-700`}>Home</Link>
          <Link to="/providers" className={`${isActiveRoute("/providers") ? "text-red-600 font-bold" : isHomeRoute && !isScrolled ? "text-white" : "text-black"} hover:text-red-700`}>Our Providers</Link>
          <Link to="/add-catering" className={`${isActiveRoute("/add-catering") ? "text-red-600 font-bold" : isHomeRoute && !isScrolled ? "text-white" : "text-black"} hover:text-red-700`}>Become a Provider</Link>
          <Link to="/favoriteProviders" className={`${isActiveRoute("/favoriteProviders") ? "text-red-600 font-bold" : isHomeRoute && !isScrolled ? "text-white" : "text-black"} hover:text-red-700`}>Saved List</Link>
          <div className="relative" ref={moreRef}>
            <button className={`flex items-center ${isHomeRoute && !isScrolled ? "text-white" : "text-black"}`} onClick={() => setIsMoreOpen(!isMoreOpen)}>
              More <IoIosArrowDown className="ml-2" />
            </button>
            <ul className={`absolute mt-2 bg-white text-black shadow-md z-10 w-48 transition-all duration-300 ease-out origin-top transform ${isMoreOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
              {moreOptions.map((option, index) => (
                <li key={index}>
                  <Link
                    to={option.path}
                    className={`block px-4 py-2 hover:bg-gray-100 ${isActiveRoute(option.path) ? "text-red-600 font-bold" : "text-black"} hover:text-red-700`}
                    onClick={() => {
                      setIsMoreOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="relative lg:hidden" ref={menuRef}>
          <button className={`${isHomeRoute && !isScrolled ? "text-white" : "text-black"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-2xl" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-52 bg-white shadow-lg z-10">
              <nav className="flex flex-col">
                <Link to="/" className={`px-4 py-2 hover:bg-gray-100 ${isActiveRoute("/") ? "text-red-600 font-bold" : "text-black"}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/providers" className={`px-4 py-2 hover:bg-gray-100 ${isActiveRoute("/providers") ? "text-red-600 font-bold" : "text-black"}`} onClick={() => setIsMenuOpen(false)}>Our Providers</Link>
                <Link to="/add-catering" className={`px-4 py-2 hover:bg-gray-100 ${isActiveRoute("/add-catering") ? "text-red-600 font-bold" : "text-black"}`} onClick={() => setIsMenuOpen(false)}>Become a Provider</Link>
                <Link to="/favoriteProviders" className={`px-4 py-2 hover:bg-gray-100 ${isActiveRoute("/favoriteProviders") ? "text-red-600 font-bold" : "text-black"}`} onClick={() => setIsMenuOpen(false)}>Saved List</Link>
                <div className="relative">
                  <button className="px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center justify-between" onClick={(e) => {
                    e.stopPropagation();
                    setIsServicesOpen((prev) => !prev);
                  }}>
                    More <IoIosArrowDown className="ml-2" />
                  </button>
                  <ul className={`absolute top-12 left-20 w-40 bg-white shadow-lg transition-all duration-300 ease-out origin-top transform ${isServicesOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                    {moreOptions.map((option, index) => (
                      <li key={index}>
                        <Link
                          to={option.path}
                          className={`block px-4 py-2 hover:bg-gray-100 ${isActiveRoute(option.path) ? "text-red-600 font-bold" : "text-black"}`}
                          onClick={() => {
                            setIsServicesOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {option.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="space-x-4">
          {user ? (
            <div className="relative" ref={profileRef}>
              <img
                src={user?.photoURL || logo}
                alt={user?.displayName}
                className="w-11 h-11 border-2 border-base-300 rounded-full cursor-pointer"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />
              <div className={`absolute top-full right-0 mt-2 w-24 transition-all duration-300 ease-out origin-top transform ${isProfileOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 w-full font-bold text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/auth/login">
                <button className={`btn btn-sm text-base font-semibold hover:bg-red-600 hover:text-white ${isActiveRoute("/auth/login") ? "text-white bg-red-500" : "text-red-500 border border-red-500"}`}>
                  Log In
                </button>
              </Link>
              <Link to="/auth/register">
                <button className={`btn btn-sm text-base font-semibold hover:bg-red-600 hover:text-white ${isActiveRoute("/auth/register") ? "text-white bg-red-500" : "text-red-500 border border-red-500"}`}>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
