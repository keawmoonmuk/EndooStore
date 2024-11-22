import React, { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  Users,
  ShoppingBasket,
  ListOrdered,
  TrendingUp,
  DollarSign
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    salesTrend: []
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">แดชบอร์ด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* การขายทั้งหมด */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">การขายทั้งหมด</p>
              <p className="text-2xl font-bold">฿45,231</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12.5%</span>
            <span className="text-gray-500 ml-2">จากเดือนที่แล้ว</span>
          </div>
        </div>

        {/* คำสั่งซื้อ */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">คำสั่งซื้อ</p>
              <p className="text-2xl font-bold">128</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ListOrdered className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8.2%</span>
            <span className="text-gray-500 ml-2">จากเดือนที่แล้ว</span>
          </div>
        </div>

        {/* สินค้า */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">สินค้า</p>
              <p className="text-2xl font-bold">84</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ShoppingBasket className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+4.1%</span>
            <span className="text-gray-500 ml-2">จากเดือนที่แล้ว</span>
          </div>
        </div>

        {/* ลูกค้า */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ลูกค้า</p>
              <p className="text-2xl font-bold">291</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+6.8%</span>
            <span className="text-gray-500 ml-2">จากเดือนที่แล้ว</span>
          </div>
        </div>
      </div>

      {/* คำสั่งซื้อล่าสุด */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">คำสั่งซื้อล่าสุด</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">หมายเลขคำสั่งซื้อ</th>
                <th className="text-left py-3 px-4">ลูกค้า</th>
                <th className="text-left py-3 px-4">สถานะ</th>
                <th className="text-right py-3 px-4">ยอดรวม</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">#12345</td>
                <td className="py-3 px-4">สมชาย ใจดี</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                    สำเร็จ
                  </span>
                </td>
                <td className="py-3 px-4 text-right">฿1,250</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">#12344</td>
                <td className="py-3 px-4">สมหญิง รักดี</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm">
                    รอดำเนินการ
                  </span>
                </td>
                <td className="py-3 px-4 text-right">฿2,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard