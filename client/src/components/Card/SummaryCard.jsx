import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { ShoppingCart, MapPin, DollarSign } from "lucide-react";
import { listUserCart, saveUserAddress } from "../../api/user";
import useEcomStore from "../../stores/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  // console.log("summary : ",token);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  //เก็บข้อมูล address
  const [fullName, setfullName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [subdistrict, setsubDistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [addressSaved, setAddressSaved] = useState(false); //สำหรับตรวจสอบว่า save address หรือ ยัง เพื่อเปลี่ยน สถานะไปชำระเงิน

  // const [address, setAddress] = useState({
  //   fullName : '',
  //   addressLine : '',
  //   district: '',
  //   postalCode : '',
  //   province:''
  // })

  useEffect(() => {
    handleGetUserCart(token);
  }, []);

  const handleGetUserCart = () => {
    listUserCart(token)
      .then((res) => {
        // console.log(res);
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(products);

  const handleSaveAddress = () => {
    const addressFields = {
      fullName: fullName,
      addressLine: addressLine,
      subdistrict: subdistrict,
      district: district,
      province: province,
      postalCode: postalCode,
    };

    const emptyFields = Object.entries(addressFields).find(
      ([key, value]) => !value
    );
    if (emptyFields) {
      return toast.warning(`Please enter a ${emptyFields[0]}`);
    }

    const address = `ชื่อ : ${fullName}, ที่อยู่ : ${addressLine}, ตำบล : ${subdistrict}, อำเภอ : ${district}, จังหวัด : ${province}, รหัสไปรณีย์ : ${postalCode}`;

    if (!fullName) {
      return toast.warning("please enter a full name");
    }
    console.log(address);
    saveUserAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่เพื่อจัดส่งสินค้า");
    }

    navigate("/user/payment");
  };

  // const handleChange = (field, value) => {
  //   setAddress((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Shipping Form */}
        <Card className="w-full lg:w-1/2 shadow-lg">
          <CardContent>
            <div className="flex items-center mb-4">
              <MapPin className="text-blue-500 mr-2" size={24} />
              <Typography variant="h6" className="font-semibold text-gray-800">
                ที่อยู่ในการจัดส่ง
              </Typography>
            </div>

            <form className="space-y-4">
              <TextField
                onChange={(e) => setfullName(e.target.value)}
                fullWidth
                label="ชื่อ-นามสกุล"
                variant="outlined"
                className="bg-gray-100"
                required
              />
              <TextField
                onChange={(e) => setAddressLine(e.target.value)}
                fullWidth
                label="ที่อยู่"
                variant="outlined"
                className="bg-gray-100"
                required
              />
              <div className="flex gap-4">
                <TextField
                  onChange={(e) => setsubDistrict(e.target.value)}
                  fullWidth
                  label="ตำบล"
                  variant="outlined"
                  className="bg-gray-100"
                  required
                />
                <TextField
                  onChange={(e) => setDistrict(e.target.value)}
                  fullWidth
                  label="อำเภอ"
                  variant="outlined"
                  className="bg-gray-100"
                  required
                />
              </div>

              <div className="flex gap-4">
                <TextField
                  onChange={(e) => setProvince(e.target.value)}
                  label="จังหวัด"
                  variant="outlined"
                  className="w-1/2 bg-gray-100"
                  required
                />
                <TextField
                  onChange={(e) => setPostalCode(e.target.value)}
                  label="รหัสไปรณีย์"
                  variant="outlined"
                  className="w-1/2 bg-gray-100"
                  required
                />
              </div>
              <Button
                onClick={handleSaveAddress}
                variant="contained"
                color="primary"
                fullWidth
                className="bg-blue-500 hover:bg-blue-600"
              >
                บันทึกข้อมูล
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Section - Order Summary */}
        {/* Right Section - Order Summary */}
        <Card className="w-full lg:w-1/2 shadow-lg rounded-lg overflow-hidden">
          <CardContent>
            <div className="flex items-center mb-6">
              <ShoppingCart className="text-green-500 mr-2" size={24} />
              <Typography variant="h6" className="font-semibold text-gray-800">
                สรุปรายการสินค้า
              </Typography>
            </div>

            {/* Item List */}
            <div className="space-y-4 mb-6">
              {products?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border-b border-gray-200"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.product.title}
                    </span>
                    <span className="text-gray-500">
                      จำนวน: {item.count} x {item.product.price.toLocaleString()} บาท
                    </span>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {(item.count * item.product.price).toLocaleString()} บาท
                  </span>
                </div>
              ))}
            </div>

            <Divider className="my-4" />

            {/* Subtotal and Total */}
            <div className="flex justify-between text-lg font-semibold text-gray-700 mt-4">
              <span>ค่าจัดส่ง</span>
              <span>105.00 บาท</span>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-700 mt-2">
              <span>ส่วนลด</span>
              <span>-10.00 บาท</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-800 mt-6">
              <span>ยอดรวมทั้งหมด</span>
              <span className="text-green-600">{cartTotal.toLocaleString()} บาท</span>
            </div>

            {/* Checkout Button */}
            <div className="mt-8">
              <Button
                onClick={handlePayment}
                variant="contained"
                color="success"
                fullWidth
                className="py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg flex items-center justify-center"
              >
                ดำเนินการชำระเงิน
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryCard;
