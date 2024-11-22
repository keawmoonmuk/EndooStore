import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { getImages } from "../../api/images";

const ContentCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    handleGetImages();
  }, []);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const handleGetImages = async () => {
    const res = await getImages()
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="carousel-container relative">
      {/* header bar image */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper mb-4 mt-2"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="carousel-overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-bold mb-2">
                คอมพิวเตอร์ลดสูงสุด -15%
              </h2>
              <p className="text-lg mb-4">
                สินค้ามีหลายรายการที่มีการลดราคา สามารถเลือกซื้อสินค้าได้เลย.
              </p>
              <Link to={"/shop"}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                  {" "}
                  Shop Now
                </button>
              </Link>
            </div>
            <img
              className="rounded-md"
              src={image.download_url}
              alt=""
              style={{ height: "700px" }}
            />
          </SwiperSlide>
        ))}

        {/* autoplay progress  */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent} className="text-red-500 font-bold"></span>
        </div>
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
