import React from "react";
import { Outlet } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <MainNavBar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
