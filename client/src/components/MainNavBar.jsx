import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useEcomStore from "../stores/ecom-store";
import Badge from "@mui/material/Badge";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  ChevronDown,
  Contact,
  BookOpenText,
  Building2,
  Menu,
  X,
} from "lucide-react";

const MainNavBar = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* <ShoppingBag className="h-8 w-8 text-white" />  */}
          <img src="src\assets\logo.png" alt="Endoo Shop Logo" className="h-20 w-auto" />
           <span className="text-3xl font-bold text-white">Endoo Shop</span>  
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-gray-200 transition-colors">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navbar Links - Desktop View */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-700/50 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                : "text-white hover:text-gray-200 px-4 py-2 font-medium transition-all duration-200 transform hover:scale-105"
            }
          >
            <Home className="inline-block mr-2" size={20} />
            หน้าแรก
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-700/50 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                : "text-white hover:text-gray-200 px-4 py-2 font-medium transition-all duration-200 transform hover:scale-105"
            }
          >
            <ShoppingBag className="inline-block mr-2" size={20} />
            สินค้า
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-700/50 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                : "text-white hover:text-gray-200 px-4 py-2 font-medium transition-all duration-200 transform hover:scale-105"
            }
          >
            <BookOpenText className="inline-block mr-2" size={20} />
            บทความ
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-700/50 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                : "text-white hover:text-gray-200 px-4 py-2 font-medium transition-all duration-200 transform hover:scale-105"
            }
          >
            <Contact className="inline-block mr-2" size={20} />
            ติดต่อเรา
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-700/50 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                : "text-white hover:text-gray-200 px-4 py-2 font-medium transition-all duration-200 transform hover:scale-105"
            }
          >
            <Building2 className="inline-block mr-2" size={20} />
            เกี่ยวกับเรา
          </NavLink>
        </div>

        {/* Cart and User Icons - Desktop View */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/cart" className="relative transform hover:scale-110 transition-transform">
            <Badge badgeContent={carts.length} color="error">
              <ShoppingCart className="text-white" size={24} />
            </Badge>
          </NavLink>

          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white hover:opacity-80 transition-opacity"
              >
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="User avatar"
                />
                <ChevronDown className="ml-1" size={20} />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
                  <Link
                    to="/user/history"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    ประวัติการสั่งซื้อ
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg transition-colors"
                  >
                    ออกจากระบบ
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/register"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                สมัครสมาชิก
              </NavLink>
              <NavLink
                to="/login"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                เข้าสู่ระบบ
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700/50 py-4 px-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block text-white bg-blue-800/50 py-2 px-4 rounded-lg"
                : "block text-white hover:bg-blue-800/30 py-2 px-4 rounded-lg transition-colors"
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="inline-block mr-2" size={20} />
            หน้าแรก
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "block text-white bg-blue-800/50 py-2 px-4 rounded-lg"
                : "block text-white hover:bg-blue-800/30 py-2 px-4 rounded-lg transition-colors"
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShoppingBag className="inline-block mr-2" size={20} />
            สินค้า
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "block text-white bg-blue-800/50 py-2 px-4 rounded-lg"
                : "block text-white hover:bg-blue-800/30 py-2 px-4 rounded-lg transition-colors"
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <BookOpenText className="inline-block mr-2" size={20} />
            บทความ
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "block text-white bg-blue-800/50 py-2 px-4 rounded-lg"
                : "block text-white hover:bg-blue-800/30 py-2 px-4 rounded-lg transition-colors"
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Contact className="inline-block mr-2" size={20} />
            ติดต่อเรา
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "block text-white bg-blue-800/50 py-2 px-4 rounded-lg"
                : "block text-white hover:bg-blue-800/30 py-2 px-4 rounded-lg transition-colors"
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Building2 className="inline-block mr-2" size={20} />
            เกี่ยวกับเรา
          </NavLink>

          <div className="flex justify-center items-center gap-6 mt-6 border-t border-blue-500/30 pt-6">
            <NavLink to="/cart" className="relative transform hover:scale-110 transition-transform">
              <Badge badgeContent={carts.length} color="error">
                <ShoppingCart className="text-white" size={24} />
              </Badge>
            </NavLink>

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                    alt="User avatar"
                  />
                  <ChevronDown size={20} />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                    <Link
                      to="/user/history"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      ประวัติการสั่งซื้อ
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      ออกจากระบบ
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <NavLink
                  to="/register"
                  className="w-full text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  สมัครสมาชิก
                </NavLink>
                <NavLink
                  to="/login"
                  className="w-full text-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  เข้าสู่ระบบ
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavBar;
