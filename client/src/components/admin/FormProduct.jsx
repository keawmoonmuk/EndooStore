import React, { useState, useEffect } from "react";
import useEcomStore from "../../stores/ecom-store";
import { createProduct, deleteProduct } from "../../api/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Plus, Edit2, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { dateFormat } from "../../utils/dateformat";

//ตัวแปรเริ่มต้น
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token); //get token
  const getCategory = useEcomStore((state) => state.getCategory); //get category จาก global state --ecom-store
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct); //get category จาก global state --ecom-store
  const products = useEcomStore((state) => state.products);
  //console.log(products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  // console.log(token, "----",getCategory);
  // console.log(category);

  useEffect(() => {
    getCategory();
    getProduct(50); // แสดงจำนวนในหน้า product management
  }, []);

  //
  const handleOnChange = (event) => {
    console.log(event.target.name, event.target.value);
    setForm({
      ...form,
      [event.target.name]: event.target.value, //key : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(form);\

    try {
      const res = await createProduct(token, form);
      //console.log(res);

      toast.success(`เพิ่มข้อมูล  ${res.data.product.title} สำเร็จ`);
      setForm(initialState); //clear value in form
      getProduct(50); //โหลดสินค้าใหม่
    } catch (error) {
      console.log(error);
    }
  };

  //delete product
  const handledeleteProduct = async (id, title) => {
    console.log(id);
    try {
      // แสดงการแจ้งเตือนการยืนยันการลบ
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

      // ถ้าผู้ใช้กดยืนยัน
      if (result.isConfirmed) {
        console.log("result is confirmed");

        const res = await deleteProduct(token, id);

        console.log("result delete");

        console.log(res);
        Swal.fire("ลบเรียบร้อย!", `ลบ ${title} สำเร็จแล้ว`, "success");

        getProduct(50);
      } else {
        console.log("การลบถูกยกเลิก");
      }
      console.log("result is not confirmed");
    } catch (error) {
      console.log("error handle delete product", error);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
      <Box className="w-full mx-auto space-y-6">
        {/* Header with Gradient */}
        <Card
          variant="outlined"
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" spacing={2}>
              <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <Typography
                variant="h4"
                className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent "
              >
                Product Management
              </Typography>
            </Box>
            {/* <Box>
              <Typography variant="body2" color="textSecondary">
                Welcome, Admin
              </Typography>
            </Box> */}
          </Box>
        </Card>

        {/* Add Product Form Card */}
        <Card variant="outlined" className="border border-gray-100 shadow-lg">
          <CardHeader
            title={
              <Box display="flex" alignItems="center" spacing={1}>
                <Plus className="w-5 h-5 text-blue-500" />
                <Typography variant="h6">เพิ่มข้อมูลสินค้า</Typography>
              </Box>
            }
          />
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <div>
                  <TextField
                    label="ชื่อสินค้า"
                    name="title"
                    value={form.title}
                    onChange={handleOnChange}
                    fullWidth
                    variant="outlined"
                    placeholder="เช่น iPhone 15 Pro Max"
                    required
                    // error={!form.title} // ถ้าไม่มีค่าให้แสดง error
                    // helperText={!form.title ? "กรุณากรอกชื่อสินค้า" : ""}
                  />
                </div>
                <div>
                  <TextField
                    label="รายละเอียด"
                    name="description"
                    value={form.description}
                    onChange={handleOnChange}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    placeholder="รายละเอียดสินค้า"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextField
                      label="ราคา (บาท)"
                      name="price"
                      value={form.price}
                      onChange={handleOnChange}
                      type="number"
                      fullWidth
                      variant="outlined"
                      placeholder="0.00"
                      required
                      inputProps={{ min: 0, step: "0.01" }} // กำหนดค่า min เป็น 0 และรองรับทศนิยมสองตำแหน่ง
                      error={form.price < 0 || form.price === ""} // แสดง error ถ้าราคาเป็นค่าติดลบหรือไม่ได้กรอก
                      helperText={
                        !form.price
                          ? "กรุณากรอกราคา"
                          : form.price < 0
                          ? "ราคาต้องไม่ติดลบ"
                          : ""
                      }
                    />
                  </div>
                  <div>
                    <TextField
                      label="จำนวน (ชิ้น)"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleOnChange}
                      type="number"
                      fullWidth
                      variant="outlined"
                      placeholder="0"
                      required
                      inputProps={{ min: 0 }} // กำหนดค่า min เป็น 0
                      error={form.quantity < 0 || form.quantity === ""} // แสดง error ถ้าจำนวนเป็นค่าติดลบหรือไม่ได้กรอก
                      helperText={
                        !form.quantity
                          ? "กรุณากรอกจำนวนสินค้า"
                          : form.quantity < 0
                          ? "จำนวนต้องไม่ติดลบ"
                          : ""
                      }
                    />
                  </div>
                </div>

                <div>
                  <TextField
                    select
                    name="categoryId"
                    label="หมวดหมู่"
                    value={form.categoryId || ""}
                    onChange={handleOnChange}
                    fullWidth
                    variant="outlined"
                    required
                  >
                    <MenuItem value="" disabled>
                      กรุณาเลือกหมวดหมู่
                    </MenuItem>
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                {/***** uplaod file **********/}
                <UploadFile dataform={form} datasetForm={setForm} />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full flex justify-center items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>เพิ่มข้อมูลสินค้า</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card
          variant="outlined"
          className="border border-gray-100 shadow-lg overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-lg font-medium text-black uppercase tracking-wider">
                      ลำดับ
                    </th>
                    <th className="px-4 py-2 text-center text-lg font-medium text-black uppercase tracking-wider whitespace-nowrap w-auto">
                      รูปภาพสินค้า
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-medium text-black uppercase tracking-wider">
                      ชื่อสินค้า
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-medium text-black uppercase tracking-wider">
                      รายละเอียด
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-medium text-black uppercase tracking-wider">
                      ราคา
                    </th>
                    <th className="px-4 py-2 text-center text-lg font-medium text-black uppercase tracking-wider whitespace-nowrap w-auto">
                      คงเหลือ
                    </th>
                    <th className="px-4 py-2 text-center text-lg font-medium text-black uppercase tracking-wider whitespace-nowrap w-auto">
                      ขายแล้ว
                    </th>
                    <th className="px-4 py-2 text-center text-lg font-medium text-black uppercase tracking-wider whitespace-nowrap w-auto">
                      อัปเดตล่าสุด
                    </th>
                    <th className="px-16 py-4 text-left text-lg font-medium text-black uppercase tracking-wider">
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {/* ตรวตว่ามีข้อมูล product หรือไม่ */}
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {/* index ลำดับ */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* <div className="flex items-center"> */}
                          <div className="h-10 w-10 rounded-full bg-gray-200">
                            {/* <img
                          src={product.images}                          
                          className="object-cover h-full w-full rounded-full"
                        /> */}
                            {product.images.length > 0 ? (
                              <img src={product.images[0].url} className="" />
                            ) : (
                              <div>No Image</div>
                            )}
                          </div>

                          {/* <span className="ml-4 text-sm font-medium">
                            {product.title}
                          </span> */}
                          {/* </div> */}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs"
                          title={product.title}
                        >
                          {product.title}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs"
                          title={product.description}
                        >
                          {product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.sold}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/* {new Date(product.updatedAt).toLocaleString("th-TH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })} */}
                          {dateFormat(product.updatedAt)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {/* edit */}
                          <Button color="primary" size="small">
                            <Link to={"/admin/product/" + product.id}>
                              {" "}
                              <Edit2 className="w-4 h-4" />
                            </Link>
                          </Button>
                          {/* delete */}
                          <Button
                            onClick={() =>
                              handledeleteProduct(product.id, product.title)
                            }
                            color="secondary"
                            size="small"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        ไม่พบข้อมูลสินค้า
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FormProduct;
