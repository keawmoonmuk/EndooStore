import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/Product";
import ProductCard from "../Card/ProductCard";
import ShowProduct from "../../utils/ShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* // <ShowProduct> */}
      {data?.map((item, index) => (
        //  <SwiperSlide key={index}> <ProductCard key={index} item={item}/></SwiperSlide>
        <ProductCard key={index} item={item} />
      ))}
      {/* // </ShowProduct> */}
    </div>
  );
};

export default BestSeller;
