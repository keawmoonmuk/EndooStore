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
  Divider,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { CheckCircle, RotateCw, XCircle, Circle, Loader, TrendingUp, Package, DollarSign, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { dateFormat } from "../../utils/dateformat";

const DashboardAdmin = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [orderStatusMap, setOrderStatusMap] = useState({});
  const products = useEcomStore((state) => state.products);
  const getProduct = useEcomStore((state) => state.getProduct);

  useEffect(() => {
    handleGetOrderAdmin();
    getProduct(50);
  }, []);

  const handleGetOrderAdmin = () => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("อัพเดทสถานะคำสั่งซื้อสำเร็จ");
        handleGetOrderAdmin();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    setOrderStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
    handleChangeOrderStatus(orderId, newStatus);
  };

  // คำนวณยอดขายรวม
  const totalSales = orders.reduce((sum, order) => sum + order.cartTotal, 0);
  
  // คำนวณจำนวนสินค้าที่ขายได้ทั้งหมด
  const totalSoldItems = products.reduce((sum, product) => sum + product.sold, 0);

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <Typography variant="h4" className="font-bold  mb-6  text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        ผู้ดูแลระบบ
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <Typography color="textSecondary" variant="subtitle2">คำสั่งซื้อทั้งหมด</Typography>
              <Typography variant="h4" className="font-bold text-blue-600">{orders.length}</Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <Typography color="textSecondary" variant="subtitle2">ยอดขายรวม</Typography>
              <Typography variant="h4" className="font-bold text-green-600">฿{totalSales.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <Typography color="textSecondary" variant="subtitle2">สินค้าทั้งหมด</Typography>
              <Typography variant="h4" className="font-bold text-purple-600">{products.length}</Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <Typography color="textSecondary" variant="subtitle2">ขายแล้วทั้งหมด</Typography>
              <Typography variant="h4" className="font-bold text-orange-600">{totalSoldItems}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white rounded-xl shadow-lg mb-8">
        <CardContent>
          <Typography variant="h6" className="font-bold mb-4">
            รายการคำสั่งซื้อล่าสุด
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell align="center" className="font-semibold">ลำดับ</TableCell>
                  <TableCell align="center" className="font-semibold">ผู้ใช้งาน</TableCell>
                  <TableCell align="center" className="font-semibold">วันที่</TableCell>
                  <TableCell align="center" className="font-semibold">สินค้า</TableCell>
                  <TableCell align="center" className="font-semibold">ราคารวม</TableCell>
                  <TableCell align="center" className="font-semibold">สถานะ</TableCell>
                  <TableCell align="center" className="font-semibold">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{order.orderedBy.email}</TableCell>
                    <TableCell align="center">{dateFormat(order.createdAt)}</TableCell>
                    <TableCell align="left">
                      <div className="space-y-2 text-sm text-gray-700">
                        {order.products?.map((product, i) => (
                          <div key={i} className="flex flex-col bg-gray-50 p-2 rounded-md">
                            <div className="font-semibold">{product.product.title}</div>
                            <div className="flex justify-between text-gray-600 mt-1">
                              <span>จำนวน: {product.count} ชิ้น</span>
                              <span className="font-semibold">
                                ฿{(product.count * product.product.price).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell align="center" className="text-green-600 font-semibold">
                      ฿{order.cartTotal.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center">
                        {getOrderStatusStyles(order.orderStatus).icon}
                        <span className={`px-2 py-1 rounded-full text-sm ${getOrderStatusStyles(order.orderStatus).className}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <select
                        value={orderStatusMap[order.id] || order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring focus:ring-blue-200"
                      >
                        <option value="Not process">Not process</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardAdmin;