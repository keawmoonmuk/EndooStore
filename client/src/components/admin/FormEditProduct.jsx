import React, { useState, useEffect } from "react";
import useEcomStore from "../../stores/ecom-store";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
// import { Card, CardHeader, CardContent } from '@components/ui/card';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Plus, Edit2, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

//ตัวแปรเริ่มต้น
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();    //get use params from frontend
 const navigate = useNavigate();  
  
  const token = useEcomStore((state) => state.token); //get token

  //category
  const getCategory = useEcomStore((state) => state.getCategory); //get category จาก global state --ecom-store
  const categories = useEcomStore((state) => state.categories);

  //product
  //   const getProduct = useEcomStore((state) => state.getProduct); //get category จาก global state --ecom-store
  //   const products = useEcomStore((state) => state.products);
  //console.log(products);

  const [form, setForm] = useState(initialState);

  // console.log(token, "----",getCategory);
  // console.log(category);

  useEffect(() => {
    getCategory();
    // getProduct(token, 30);    // แสดงจำนวนในหน้า product management
    fetchProduct(token, id, form);
  }, []);

  //get produdt
  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);

      console.log("res data : ", res);
      setForm(res.data)
    } catch (error) {
      console.log("Error fetch data", error);
    }
  };

  console.log(form);
  

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
      const res = await updateProduct(token,id, form);
      //console.log(res);
      toast.success(`แก้ไขข้อมูลสินค้า  ${res.data.title} สำเร็จ`);
      navigate('/admin/product')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
      <Box className="max-w-7xl mx-auto space-y-6">
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
                <Typography variant="h6">แก้ไขข้อมูลสินค้า</Typography>
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
                  <span>บันทึกการแก้ไขข้อมูลสินค้า</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FormEditProduct;
