import React from "react";
import { ListCheck } from "lucide-react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import useEcomStore from "../../stores/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { constant } from "lodash";

const ListCartProduct = () => {
  const cart = useEcomStore((state) => state.carts); // เข้าถึง carts ใน glaball state
  const GetTotalPrice = useEcomStore((state) => state.GetTotalPrice); //get total price
  const user = useEcomStore((state) => state.user); // get user from store
  const token = useEcomStore((state) => state.token);

  const navigate = useNavigate();
  // console.log(token);

  // console.log("carts {} : ",{ cart }); //ถ้าเอา {} ครอบจะทำให้เป็น object
  // console.log("carts no :", cart); //ถ้าไม่เอา {} ครอบจะเป็น array 0,1,2

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("บันทึกข้อมูลในตะกร้าสินค้าสำเร็จ");

        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="bg-gray-300 rounded-sm p-4">
      {/* header */}
      <div className="flex gap-4 mb-4">
        <ListCheck size={36} />
        <h1 className="text-2xl font-bold">
          รายการสินค้า {cart.length} รายการ
        </h1>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* left */}
        <div className="col-span-2">
          {cart.map((item, index) => (
            <div key={index} className="mb-6">
              <Card className="bg-gray-50 rounded-lg shadow-lg mb-4 p-4">
                <CardContent className="flex justify-between items-center">
                  {/* Product Details */}
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
                      {item.images ? (
                        <img
                          src={item.images[0].url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 bg-gray-300">
                          No Image
                        </span>
                      )}
                    </div>
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {item.price} * {item.count}
                      </Typography>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <IconButton
                    onClick={() => actionRemoveProduct(item.id)}
                    aria-label="remove"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Typography
                      variant="h6"
                      className="font-semibold text-blue-600"
                    >
                      {(item.price * item.count).toLocaleString()} ฿
                    </Typography>
                  </IconButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <h1>ยอดรวม</h1>
          <div className="flex justify-between">
            <span className="text-2xl font-bold">รวมสุทธิ</span>
            <span className="text-2xl font-bold">
              {GetTotalPrice().toLocaleString()} ฿
            </span>
          </div>

          <div>
            {user ? (
              <Link>
                <button
                  onClick={handleSaveCart}
                  className={`${
                    cart.length > 0
                      ? "bg-red-500"
                      : "bg-gray-400 cursor-not-allowed"
                  } w-full rounded-md text-white py-2 shadow-md`}
                  disabled={cart.length === 0}
                >
                  สั่งซื้อ
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-500 w-full rounded-md text-white py-2 mt-2 shadow-md">
                  Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="mt-6 bg-green-500 text-white font-semibold w-full py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                แก้ไข
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCartProduct;
