import React, { useState, useEffect } from "react";
import useEcomStore from "../../stores/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { Search, Tag, DollarSign } from "lucide-react";

const SerachProductCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 500000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      text ? actionSearchFilters({ query: text }) : getProduct();
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);
    findCheck === -1 ? inState.push(inCheck) : inState.splice(findCheck, 1);
    setCategorySelected(inState);
    inState.length > 0 ? actionSearchFilters({ category: inState }) : getProduct();
  };

  useEffect(() => {
    actionSearchFilters({ price })
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok)
    }, 300);
  };

  return (
    <Card elevation={2} className="rounded-xl">
      <CardContent className="space-y-6">
        {/* Search Section */}
        <div>
          <Typography variant="h6" className="flex items-center gap-2 font-bold mb-3">
            <Search size={20} className="text-blue-600" />
            ค้นหาสินค้า
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="ค้นหาสินค้าที่ต้องการ..."
            onChange={(e) => setText(e.target.value)}
            className="bg-white"
          />
        </div>

        <Divider />

        {/* Categories Section */}
        <div>
          <Typography variant="h6" className="flex items-center gap-2 font-bold mb-3">
            <Tag size={20} className="text-blue-600" />
            หมวดหมู่สินค้า
          </Typography>
          <div className="space-y-2">
            {categories.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={handleCheck}
                    value={item.id}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" className="text-gray-700">
                    {item.name}
                  </Typography>
                }
              />
            ))}
          </div>

          {products.length === 0 && (
            <Typography variant="body2" className="text-red-500 mt-2 italic">
              ไม่พบสินค้าในหมวดหมู่ที่เลือก
            </Typography>
          )}
        </div>

        <Divider />

        {/* Price Range Section */}
        <div>
          <Typography variant="h6" className="flex items-center gap-2 font-bold mb-3">
            <DollarSign size={20} className="text-blue-600" />
            ช่วงราคา
          </Typography>
          
          <Box className="px-2">
            <div className="flex justify-between mb-2">
              <Typography variant="body2" className="text-gray-600">
                ฿{price[0].toLocaleString()}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                ฿{price[1].toLocaleString()}
              </Typography>
            </div>
            
            <Slider
              onChange={handlePrice}
              range
              min={0}
              max={500000}
              defaultValue={[0, 50000]}
              trackStyle={[{ backgroundColor: "#3b82f6", height: 6 }]}
              handleStyle={[
                { backgroundColor: "#3b82f6", borderColor: "#3b82f6", height: 16, width: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" },
                { backgroundColor: "#3b82f6", borderColor: "#3b82f6", height: 16, width: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }
              ]}
              railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
            />
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};

export default SerachProductCard;
