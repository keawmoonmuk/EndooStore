import React, { useState, useEffect } from "react";
import ProductCard from "../components/Card/ProductCard";
import useEcomStore from "../stores/ecom-store";
import { Typography, Box, Divider, InputBase, IconButton } from "@mui/material";
import { Search } from "lucide-react";
import SerachProductCard from "../components/Card/SerachProductCard";
import CartProductCard from "../components/Card/CartProductCard";


const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct); //get product from store
  const products = useEcomStore((state) => state.products);

  
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-200">
      {/*left search filters */}
      <div className="w-full lg:w-1/4 p-4 bg-white">
        <SerachProductCard />
      </div>

      {/* Product list */}
      <div className="w-full lg:w-1/2 p-4 md:p-6 overflow-y-auto bg-gray-100">
        <Typography variant="h5" className="text-center font-bold mb-4 text-gray-800">
          สินค้าทั้งหมด
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
          {/* product card */}
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-1/4 p-4 bg-white overflow-y-auto">
        <CartProductCard/>
      </div>
    </div>
  );
};

export default Shop;
