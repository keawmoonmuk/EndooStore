import React, { useState, useEffect, useRef } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const ShowProduct = ({children}) => {
  return (
    <Swiper
    slidesPerView={7}
    spaceBetween={10}
    breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
    
      }}
    centeredSlides={true}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    // onAutoplayTimeLeft={onAutoplayTimeLeft}
    className="mySwiper object-cover rounded"
  >
    {children}
  </Swiper>
  )
}

export default ShowProduct