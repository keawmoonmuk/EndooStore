import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Badge,
} from "@mui/material";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import useEcomStore from "../../stores/ecom-store";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const CartProductCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );

  const GetTotalPrice = useEcomStore((state) => state.GetTotalPrice);

  const handleRemoveProduct = async (id, title) => {
    try {
      const result = await Swal.fire({
        title: "ยืนยันการลบ?",
        text: `คุณต้องการลบ ${title} นี้ใช่หรือไม่?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        actionRemoveProduct(id);
        Swal.fire("ลบเรียบร้อย!", `ลบ ${title} สำเร็จแล้ว`, "success");
      }
    } catch (error) {
      console.log("error handle delete product", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบสินค้าได้", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <ShoppingCart className="w-8 h-8 text-blue-600" />
        <Typography variant="h4" className="font-bold text-gray-800">
          ตะกร้าสินค้า
        </Typography>
        <Badge badgeContent={carts.length} color="primary" className="ml-2">
          <div className="w-6" />
        </Badge>
      </div>

      <div className="border border-gray-200 p-6 rounded-xl shadow-lg bg-white">
        {carts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <Typography variant="h6" className="text-gray-500 mb-4">
              ตะกร้าสินค้าว่างเปล่า
            </Typography>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                เลือกซื้อสินค้า
              </motion.button>
            </Link>
          </div>
        ) : (
          <>
            {carts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-6"
              >
                <Card className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="flex justify-between items-center p-6">
                    <div className="flex gap-6 items-center flex-1">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-white shadow-sm">
                        {item.images ? (
                          <img
                            src={item.images[0].url}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            alt={item.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Typography variant="h6" className="font-semibold text-gray-800 mb-1">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 line-clamp-2">
                          {item.description}
                        </Typography>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={() => handleRemoveProduct(item.id, item.title)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </IconButton>
                    </motion.div>
                  </CardContent>

                  <Divider />

                  <CardContent className="flex justify-between items-center p-6">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                        disabled={item.count <= 1}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={18} />
                      </motion.button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {item.count}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                      >
                        <Plus size={18} />
                      </motion.button>
                    </div>
                    <Typography variant="h6" className="font-bold text-blue-600">
                      ฿{(item.price * item.count).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <Divider className="my-6" />

            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5" className="font-bold text-gray-800">
                ยอดรวมทั้งหมด
              </Typography>
              <Typography variant="h5" className="font-bold text-blue-600">
                ฿{GetTotalPrice().toLocaleString()}
              </Typography>
            </div>

            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-600 text-white font-semibold w-full py-4 rounded-xl shadow-md hover:bg-green-700 transition duration-300"
              >
                ดำเนินการชำระเงิน
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CartProductCard;
