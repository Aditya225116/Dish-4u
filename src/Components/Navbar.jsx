import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(StoreContext);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole || "user");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 shadow-md py-3" : "bg-black py-4"
      } text-white`}
    >
      <div className="flex items-center justify-between px-6 md:px-12">
        <Link to="/">
            <img
            src={assets.Logo}
            alt="Logo"
              className="w-[80px] h-[80px] rounded-full shadow-lg object-cover"
            />
        </Link>

        {role === "admin" ? (
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <ul className="hidden md:flex gap-10 font-medium">
              <li>
                <Link to="/" className="hover:text-red-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-red-500">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500">
                  Contact
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link to="/order-confirmation" className="hover:text-red-500">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/cart" className="relative">
                <img src={assets.basket_icon} alt="cart" className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/admin-login"
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden z-50 text-white" onClick={toggleMenu}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
          </>
        )}
      </div>

      {menuOpen && role !== "admin" && (
        <div className="md:hidden bg-black bg-opacity-90 px-6 pt-4 pb-8">
          <ul className="flex flex-col gap-6 text-lg">
            <li>
              <Link to="/" onClick={closeMenu} className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="hover:text-red-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                onClick={closeMenu}
                className="hover:text-red-500"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="hover:text-red-500"
              >
                Contact
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/order-confirmation"
                  onClick={closeMenu}
                  className="hover:text-red-500"
                >
                  My Orders
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/cart"
                onClick={closeMenu}
                className="flex items-center gap-3 text-white"
              >
                <div className="relative">
                  <img
                    src={assets.basket_icon}
                    alt="cart"
                    className="h-6 w-6"
                  />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                </div>
                <span>Cart</span>
              </Link>
            </li>

            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-center block w-full"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-center block"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/admin-login"
                    onClick={closeMenu}
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 text-center block"
                  >
                    Admin
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
