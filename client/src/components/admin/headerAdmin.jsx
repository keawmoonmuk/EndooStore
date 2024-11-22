import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa';

const headerAdmin = () => {
    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-6">
          <div className="text-2xl font-bold text-gray-800">Dashboard</div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-800">
              <FaBell className="text-xl" />
            </button>
            <div className="flex items-center space-x-2 text-gray-800">
              <FaUserCircle className="text-3xl" />
              <span className="font-semibold">Admin</span>
            </div>
          </div>
        </header>
      );
}

export default headerAdmin