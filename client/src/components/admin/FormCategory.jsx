import React, { useEffect, useState } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "/src/stores/ecom-store"; //import store
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Divider,
  Card,
} from "@mui/material";
import { Trash, Plus } from "lucide-react";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token); //get token from ecomstor
  const [name, setName] = useState("");

  //const [categories, setcategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  //เรียกใช้ getcategory
  useEffect(() => {
    getCategory(token);
  }, []);

  //get category

  //add categore
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(token, name)
    //check name
    if (!name) {
      return toast.warning("Please add category name");
    }

    try {
      const res = await createCategory(token, { name }); //ถ้าใส่ {} คลอบ name จะเป็น object
      console.log(res);
      toast.success(`add category ${res.data.name} successfully`);

      getCategory(token);

      // เคลียร์ค่าใน TextField
      setName("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      // แสดงการแจ้งเตือนการยืนยันการลบ
      const result = await Swal.fire({
        title: "ยืนยันการลบ?",
        text: "คุณต้องการลบ category นี้ใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      // ถ้าผู้ใช้กดยืนยัน
      if (result.isConfirmed) {
        const res = await removeCategory(token, id);
        console.log(res);
        Swal.fire("ลบเรียบร้อย!", `ลบ ${res.data.name} สำเร็จแล้ว`, "success");
        getCategory(token);
      } else {
        console.log("การลบถูกยกเลิก");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-xl mt-10">
      <Card
        variant="outlined"
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" spacing={2}>
            <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <Typography
              variant="h4"
              className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              Category Management
            </Typography>
          </Box>
          {/* <Box>
              <Typography variant="body2" color="textSecondary">
                Welcome, Admin
              </Typography>
            </Box> */}
        </Box>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          label="Category Name"
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Category
        </Button>
      </form>

      <Divider className="my-4" />

      <Box component="ul" className="space-y-2">
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <Box
              component="li"
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              bgcolor="grey.100"
              borderRadius="borderRadius"
              boxShadow={1}
            >
              <Typography variant="body1">{item.name}</Typography>
              <IconButton
                onClick={() => handleDelete(item.id)}
                color="error"
                aria-label="Delete category"
              >
                <Trash /> {/* Using lucide-react Trash icon */}
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography  className="px-6 py-4 text-center text-sm text-gray-500" variant="body2" color="textSecondary" align="center">
            ไม่พบข้อมูล category
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormCategory;
