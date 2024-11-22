import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/sidebarAdmin";
import HeaderAdmin from "../components/admin/headerAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
