import React from "react";
import { Outlet } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";

const LayoutUser = () => {
  return (
    <div>
      <MainNavBar />
      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;
