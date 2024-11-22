import React from "react";
import { Link } from "react-router-dom";

import BestSeller from "../components/Home/BestSeller";
import NewProduct from "../components/Home/NewProduct";
import ContentCarousel from "../components/Home/contentCarousel";

const Home = () => {
  return (
    <>
      <ContentCarousel />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">สินค้าขายดี</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <BestSeller />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">สินค้าใหม่</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <NewProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
