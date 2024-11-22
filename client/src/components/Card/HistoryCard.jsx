import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { CheckCircle, RotateCw, XCircle, Circle, Loader } from "lucide-react";
import useEcomStore from "../../stores/ecom-store";
import { getOrder } from "../../api/user";
import { dateFormat } from "../../utils/dateformat";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token); //get token from store
  const [orders, setOrders] = useState([]); // เก็บ orders

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrder(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังก์ชันเพื่อกำหนด className ตามสถานะ orderStatus
  const getOrderStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return {
          icon: <CheckCircle className="w-5 h-5 mr-1 text-green-600" />,
          className: "bg-green-100 text-green-600",
        };
      case "Processing":
        return {
          icon: <RotateCw className="w-5 h-5 mr-1 text-yellow-600 animate-spin" />,
          className: "bg-yellow-100 text-yellow-600",
        };
      case "Cancelled":
        return {
          icon: <XCircle className="w-5 h-5 mr-1 text-red-600" />,
          className: "bg-red-100 text-red-600",
        };
      case "Not Processed":
        return {
          icon: <Circle className="w-5 h-5 mr-1 text-gray-600" />,
          className: "bg-gray-100 text-gray-800",
        };
      default:
        return {
          icon: <Loader className="w-5 h-5 mr-1 text-gray-600" />,
          className: "bg-gray-100 text-gray-800",
        };
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Typography variant="h4" className="text-center font-bold mb-6">
        ประวัติการสั่งซื้อ
      </Typography>

      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <Card key={index} className="bg-white shadow-md rounded-lg mb-6 hover:shadow-lg transition-shadow duration-200">
            <CardContent>
              {/* Header ของออเดอร์ */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Typography variant="body2" color="textSecondary">
                    Order Date
                  </Typography>
                  <Typography variant="subtitle1" className="font-semibold">
                    {dateFormat(order.updatedAt)}
                  </Typography>
                </div>
                {/* Icon แสดงสถานะคำสั่งซื้อ */}
                <div className="flex items-center text-orange-500">
                  {getOrderStatusStyles(order.orderStatus).icon}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      getOrderStatusStyles(order.orderStatus).className
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Table แสดงสินค้าที่สั่งซื้อ */}
              <Table className="border rounded-md overflow-hidden">
                <TableHead>
                  <TableRow className="bg-gray-200">
                    <TableCell>สินค้า</TableCell>
                    <TableCell align="right">ราคา</TableCell>
                    <TableCell align="right">จำนวน</TableCell>
                    <TableCell align="right">รวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products?.map((product, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>{product.product.title}</TableCell>
                      <TableCell align="right">
                        {product.product.price.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{product.count}</TableCell>
                      <TableCell align="right">
                        {(product.count * product.product.price).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Footer สรุปราคาสุทธิ */}
              <Box className="flex justify-end mt-4">
                <div className="text-right">
                  <Typography variant="body2" color="textSecondary">
                    ราคาสุทธิ
                  </Typography>
                  <Typography variant="h6" className="font-bold text-gray-700">
                    {order.cartTotal.toLocaleString()}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="bg-white shadow-md rounded-lg p-8 text-center">
          <CardContent>
            <Box className="flex flex-col items-center gap-4">
              <Circle className="w-16 h-16 text-gray-300" />
              <Typography variant="h6" className="text-gray-600">
                ยังไม่มีประวัติการสั่งซื้อ
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                เมื่อคุณทำการสั่งซื้อ ประวัติการสั่งซื้อจะแสดงที่นี่
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HistoryCard;
