import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../stores/ecom-store";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300">
        {/* Product Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <CardMedia
            component="img"
            image={
              item?.images?.length > 0
                ? item.images[0].url
                : "src/assets/noImage.jpg"
            }
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Sold Badge */}
          {item.sold > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              ขายแล้ว {item.sold} ชิ้น
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col p-5">
          {/* Product Title */}
          <Typography
            variant="h6"
            component="h2"
            className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2 h-14"
            title={item.title}
          >
            {item.title}
          </Typography>

          {/* Product Description */}
          <Typography
            variant="body2"
            className="text-gray-600 mb-4 line-clamp-2 h-10 text-sm"
            title={item.description}
          >
            {item.description}
          </Typography>

          <div className="mt-auto">
            {/* Price and Stock Info */}
            <Box className="flex justify-between items-center mb-4">
              <Typography
                variant="h6"
                component="span"
                className="text-2xl font-bold text-blue-600"
              >
                ฿{item.price.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  item.quantity > 0 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.quantity > 0 ? 'มีสินค้า' : 'สินค้าหมด'}
              </Typography>
            </Box>

            {/* Add to Cart Button */}
            <Button
              onClick={() => actionAddtoCart(item)}
              variant="contained"
              fullWidth
              disabled={item.quantity === 0}
              className={`py-3 rounded-lg font-medium transition-all duration-300 ${
                item.quantity > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              startIcon={<ShoppingCart className="w-5 h-5" />}
            >
              {item.quantity > 0 ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
