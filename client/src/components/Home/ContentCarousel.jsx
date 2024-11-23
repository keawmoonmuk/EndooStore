import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart, ArrowRight } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "../../styles.css";
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
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
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper mb-8 "
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="carousel-overlay absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center items-start px-16 text-white">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold mb-4 animate-fadeIn">
                  สินค้าคุณภาพดี ราคาพิเศษ
                </h2>
                <p className="text-xl mb-6 leading-relaxed animate-slideUp">
                  รับส่วนลดสูงสุด 15% สำหรับสินค้าคอมพิวเตอร์และอุปกรณ์ทุกชิ้น 
                  พร้อมบริการหลังการขายที่เป็นเลิศ
                </p>
                <Link to={"/shop"}>
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg">
                    ช้อปเลย
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
            <img
              className="w-full object-cover rounded-lg"
              src={image.download_url}
              alt="promotion banner"
              style={{ height: "80vh" }}
            />
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent} className="text-blue-600 font-bold"></span>
        </div>
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
