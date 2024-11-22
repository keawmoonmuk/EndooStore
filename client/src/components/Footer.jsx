import React from 'react'
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Section 1: Brand and Description */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Endoo Company</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  มอบสินค้าที่ดีที่สุดสำหรับคุณด้วยการบริการที่น่าประทับใจ พร้อมให้คำปรึกษาและดูแลลูกค้าทุกท่านอย่างใกล้ชิด
                </p>
              </div>
    
              {/* Section 2: Quick Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">เมนูลัด</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300">
                      <span className="mr-2">🏠</span> หน้าแรก
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300">
                      <span className="mr-2">ℹ️</span> เกี่ยวกับเรา
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300">
                      <span className="mr-2">🛒</span> สินค้าทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300">
                      <span className="mr-2">📞</span> ติดต่อเรา
                    </Link>
                  </li>
                </ul>
              </div>
    
              {/* Section 3: Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">ข้อมูลติดต่อ</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300 cursor-pointer">
                    <Mail className="mr-3 text-blue-400" size={18} /> info@EndooShop.com
                  </p>
                  <p className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300 cursor-pointer">
                    <Phone className="mr-3 text-blue-400" size={18} /> 02-989-2349
                  </p>
                  <p className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300 cursor-pointer">
                    <MapPin className="mr-3 text-blue-400" size={18} /> 66/396 ถนนเทพารักษ์, บางเมือง, สมุทรปราการ 10270
                  </p>
                </div>
              </div>
    
              {/* Section 4: Social Media */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">ติดตามเรา</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full text-gray-300 hover:bg-blue-600 hover:text-white transition duration-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full text-gray-300 hover:bg-blue-400 hover:text-white transition duration-300"
                  >
                    <Twitter size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Copyright Section */}
            <div className="text-center mt-12 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                © 2024 Endoo Company. สงวนลิขสิทธิ์ทั้งหมด
              </p>
            </div>
          </div>
        </footer>
    );
}

export default Footer