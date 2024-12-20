import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; //import router dom
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/user/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../Layouts/Layout";
import LayoutAdmin from "../Layouts/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import LayoutUser from "../Layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import EditProduct from "../pages/admin/EditProduct";
import Payment from "../pages/user/Payment";
import ManageOrder from "../pages/admin/ManageOrder";
import Blog from "../components/blogs/blog";
import ContactUs from "../components/contact/ContactUs";
import AboutUs from "../components/about/AboutUs";
import ForgotPassword from "../pages/auth/ForgotPassword";

//สร้างตัวแปรสำหรับใช้งาน route
const router = createBrowserRouter([
  {
    //ไม่ต้อง login ก็สามารถใช้งานได้
    path: "/",
    element: <Layout />,
    children: [
      //สำหรับไม่ต้อง login
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },

      { path: "blog", element: <Blog /> },
      { path: "contact", element: <ContactUs /> },
      { path: "about", element: <AboutUs /> },

      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    //สำหรับ administrations
    path: "/admin",
    //  element:  <LayoutAdmin />,
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },   //หมวดหมู่สินค้า
      { path: "product", element: <Product /> },   //สินค้า
      { path: "product/:id", element: <EditProduct /> },   //แก้ไขสินค้า
      { path: "settings", element: <Manage /> },   //ตั้งค่า
      { path: "order", element: <ManageOrder /> },   //จัดการคำสั่งซื้อ
    ],
  },
  {
    //สำหรับ user
    path: "/user",
    //  element:  <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "payment", element: <Payment /> },   //การชำระเงิน
      { path: "history", element: <History /> },   //ประวัติการซื้อ
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
