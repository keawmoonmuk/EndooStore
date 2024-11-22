import React from "react";
import {
  LayoutDashboard,
  Settings,
  ShoppingCart,
  ShoppingBasket, 
  ListOrdered,
  LogOut,
  Users,
  FileText,
  Bell
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500">ระบบจัดการร้านค้า</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium"
                : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            }
          >
            <LayoutDashboard size={20} />
            <span>แดชบอร์ด</span>
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase">จัดการสินค้า</p>
          </div>

          <NavLink
            to="category"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium"
                : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            }
          >
            <ShoppingCart size={20} />
            <span>หมวดหมู่สินค้า</span>
          </NavLink>

          <NavLink
            to="product"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium"
                : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            }
          >
            <ShoppingBasket size={20} />
            <span>รายการสินค้า</span>
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase">การขาย</p>
          </div>

          <NavLink
            to="order"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium"
                : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            }
          >
            <ListOrdered size={20} />
            <span>คำสั่งซื้อ</span>
          </NavLink>

          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium"
                : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            }
          >
            <Users size={20} />
            <span>ลูกค้า</span>
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase">ระบบ</p>
          </div>

          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium"
                : "flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            }
          >
            <Settings size={20} />
            <span>ตั้งค่า</span>
          </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/"
          className="flex items-center space-x-3 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium"
        >
          <LogOut size={20} />
          <span>ออกจากระบบ</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
