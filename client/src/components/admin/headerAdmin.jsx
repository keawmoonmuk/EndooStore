import React, { useState } from 'react'
import { Bell, ChevronDown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import useEcomStore from '../../stores/ecom-store';

const HeaderAdmin = () => {
    const location = useLocation();
    const user = useEcomStore((state) => state.user);
    const logout = useEcomStore((state) => state.logout);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const getPageTitle = () => {
        switch(location.pathname) {
            case '/admin':
                return 'แดชบอร์ด';
            case '/admin/category':
                return 'หมวดหมู่สินค้า';
            case '/admin/product':
                return 'รายการสินค้า';
            case '/admin/order':
                return 'คำสั่งซื้อ';
            case '/admin/settings':
                return 'ตั้งค่า';
            default:
                return 'แดชบอร์ด';
        }
    };

    return (
        <header className="bg-white shadow-md h-20 flex items-center justify-between px-6">
          <div className="text-2xl font-bold mx-10 mt-2 text-gray-800">{getPageTitle()}</div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-800 transform hover:scale-110 transition-transform">
              <Bell size={24} />
            </button>
            
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-800 hover:opacity-80 transition-opacity"
              >
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="Admin avatar"
                />
                <span className="font-semibold mx-2">{user?.email}</span>
                <ChevronDown size={20} />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    ตั้งค่า
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
          </div>
        </header>
    );
}

export default HeaderAdmin