import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../stores/ecom-store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

// import { Edit, Trash2, Eye } from "lucide-react";
import { CheckCircle, RotateCw, XCircle, Circle, Loader } from "lucide-react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { dateFormat } from "../../utils/dateformat";

const FormOrder = () => {
  const token = useEcomStore((state) => state.token); //get token from store
  //   console.log(token);
  const [orders, setOrders] = useState([]); //เก็บ orders

  // ใช้ useState เพื่อเก็บสถานะของ order แต่ละอัน
  const [orderStatusMap, setOrderStatusMap] = useState(
    orders.reduce(
      (acc, order) => ({ ...acc, [order.id]: order.orderStatus }),
      {}
    )
  );

  useEffect(() => {
    handleGetOrderAdmin(token);
  }, []);

  const handleGetOrderAdmin = () => {
    getOrdersAdmin(token)
      .then((res) => {
        // console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   console.log(orders);
  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    // console.log(orderId, "---", orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("updated order status successfully");

        handleGetOrderAdmin(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังก์ชันเพื่อกำหนด className ตามสถานะ orderStatus
  const getOrderStatusStyles = (status) => {
    console.log("status :", status);

    switch (status) {
      case "Completed":
        return {
          icon: <CheckCircle className="w-5 h-5 mr-1 text-green-600" />,
          className: "bg-green-100 text-green-600",
        };
      case "Processing":
        return {
          icon: (
            <RotateCw className="w-5 h-5 mr-1 text-yellow-600 animate-spin" />
          ),
          className: "bg-yellow-100 text-yellow-600",
        };
      case "Cancelled":
        return {
          icon: <XCircle className="w-5 h-5 mr-1 text-red-600" />,
          className: "bg-red-100 text-red-600",
        };
      case "Not process":
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

  const handleStatusChange = (orderId, newStatus) => {
    // อัพเดทสถานะใน state
    setOrderStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
    // เรียกใช้ฟังก์ชัน handleChangeOrderStatus เพื่ออัพเดทใน backend
    handleChangeOrderStatus(token, orderId, newStatus);
  };

  return (
    <div className="w-full p-4">
      <Typography variant="h5" className="font-bold mb-6  text-center">
        รายการคำสั่งซื้อ
      </Typography>
      <TableContainer component={Paper} className="p-4 shadow-lg rounded-lg">
        <Table aria-label="orders table">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell align="center" className="font-semibold">
                ลำดับ
              </TableCell>
              <TableCell align="center" className="font-semibold">
                ผู้ใช้งาน
              </TableCell>
              <TableCell align="center" className="font-semibold">
                วันที่
              </TableCell>
              <TableCell align="center" className="font-semibold">
                สินค้า
              </TableCell>
              <TableCell align="center" className="font-semibold">
                ที่อยู่
              </TableCell>
              <TableCell align="center" className="font-semibold">
                ราคารวมทั้งหมด
              </TableCell>
              <TableCell align="center" className="font-semibold">
                สถานะ
              </TableCell>
              <TableCell align="center" className="font-semibold">
                จัดการ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, index) => {
              return (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{order.orderedBy.email}</TableCell>
                  <TableCell align="center">
                    {dateFormat(order.createdAt)}
                  </TableCell>

                  {/* แสดงรายการสินค้าที่สั่งซื้อพร้อมจำนวนและราคา */}
                  <TableCell align="left">
                    <div className="space-y-2 text-sm text-gray-700">
                      {order.products?.map((product, i) => (
                        <div
                          key={i}
                          className="flex flex-col bg-gray-100 p-2 rounded-md shadow-sm"
                        >
                          <div className="font-semibold">
                            {product.product.title}
                          </div>

                          <div className="flex justify-between text-gray-600 mt-1">
                            <span>
                              ราคา : {product.product.price.toLocaleString()} ,
                              จำนวน : {product.count} ชิ้น{" "}
                            </span>

                            <span className="font-semibold">
                              {" "}
                              รวม{" "}
                              {(
                                product.count * product.product.price
                              ).toLocaleString()}
                            </span>
                          </div>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell
                    align="center"
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs"
                    title={order.orderedBy.address}
                  >
                    {order.orderedBy.address}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-green-600 font-semibold"
                  >
                    {order.cartTotal.toLocaleString()}
                  </TableCell>
                  {/* แสดงสถานะออเดอร์ด้วยสีที่อัพเดทตามสถานะใหม่ */}
                  <TableCell align="center" >
                <div className="flex items-center justify-center">
                <div> 
                  {getOrderStatusStyles(order.orderStatus).icon}</div>
                  <div>
                      <span 
                      className={`px-2 py-1 rounded-full text-sm ${getOrderStatusStyles(order.orderStatus).className}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
                  </TableCell>
                  {/* Dropdown เลือกสถานะออเดอร์ */}
                  <TableCell align="center">
                    <div className="flex justify-center space-x-2">
                      <select
                        value={orderStatusMap[order.id]}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring focus:ring-gray-200"
                      >
                        <option value="Not process">Not process</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormOrder;
