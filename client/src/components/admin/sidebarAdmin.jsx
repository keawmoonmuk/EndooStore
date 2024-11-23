import React, { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  ShoppingCart,
  ShoppingBasket,
  ListOrdered,
  LogOut,
  Users,
  FileText,
  Bell,
  Menu,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-12 z-50 p-2  mx-40 rounded-lg bg-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 h-screen transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-2  border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-400">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl  font-bold text-white tracking-tight">Admin Panel</h2>
            <p className="text-sm text-blue-100 mt-1 font-medium">ระบบจัดการร้านค้า</p>
          </div>
        </div>

        <nav className=" flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          <div className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
                  : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              }
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={20} />
              <span>แดชบอร์ด</span>
            </NavLink>

            <div className="pt-6 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">จัดการสินค้า</p>
            </div>

            <NavLink
              to="category"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
                  : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              }
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={20} />
              <span>หมวดหมู่สินค้า</span>
            </NavLink>

            <NavLink
              to="product"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
                  : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              }
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBasket size={20} />
              <span>รายการสินค้า</span>
            </NavLink>

            <div className="pt-6 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">การขาย</p>
            </div>

            <NavLink
              to="order"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
                  : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              }
              onClick={() => setIsOpen(false)}
            >
              <ListOrdered size={20} />
              <span>คำสั่งซื้อ</span>
            </NavLink>

            {/* ลิงค์ไปยังหน้าจัดการผู้ใช้งาน 
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
                  : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              }
              onClick={() => setIsOpen(false)}
            >
              <Users size={20} />
              <span>ลูกค้า</span>
            </NavLink>
*/}
            <div className="pt-6 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ระบบ</p>
            </div>

            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
                  : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              }
              onClick={() => setIsOpen(false)}
            >
              <Settings size={20} />
              <span>ตั้งค่า</span>
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <NavLink
            to="/"
            className="flex items-center space-x-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            <LogOut size={20} />
            <span>ออกจากระบบ</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
