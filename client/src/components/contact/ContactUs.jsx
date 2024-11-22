import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="text-center mb-12">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <Typography variant="h3" className="text-blue-600 font-bold mb-4">
          ติดต่อเรา
        </Typography>
        <Typography variant="h6" className="text-gray-600 max-w-2xl mx-auto text-center flex justify-center items-center">
          มีคำถามหรือข้อสงสัย? เราพร้อมช่วยเหลือคุณ ติดต่อเราได้ตลอด 24 ชั่วโมง
        </Typography>
        </div>
      </Box>

      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form Section */}
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Typography variant="h5" className="text-gray-800 font-bold mb-6">
              ส่งข้อความถึงเรา
            </Typography>

            <form noValidate autoComplete="off" className="space-y-6">
              <TextField
                fullWidth
                label="ชื่อของคุณ"
                variant="outlined"
                required
                className="bg-white"
                InputProps={{
                  className: "rounded-lg",
                }}
              />
              <TextField
                fullWidth
                label="อีเมลของคุณ"
                variant="outlined"
                required
                type="email"
                className="bg-white"
                InputProps={{
                  className: "rounded-lg",
                }}
              />
              <TextField
                fullWidth
                label="ข้อความ"
                variant="outlined"
                required
                multiline
                rows={6}
                className="bg-white"
                InputProps={{
                  className: "rounded-lg",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-lg"
              >
                ส่งข้อความ
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Box className="space-y-6">
          <Card className="p-6 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
            <Box className="flex items-center space-x-4">
              <Box className="bg-blue-100 p-4 rounded-full">
                <Mail className="text-blue-600" size={32} />
              </Box>
              <Box>
                <Typography variant="h6" className="font-bold text-gray-800">
                  อีเมล
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  info@EndooShop.com
                </Typography>
              </Box>
            </Box>
          </Card>

          <Card className="p-6 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
            <Box className="flex items-center space-x-4">
              <Box className="bg-blue-100 p-4 rounded-full">
                <Phone className="text-blue-600" size={32} />
              </Box>
              <Box>
                <Typography variant="h6" className="font-bold text-gray-800">
                  โทรศัพท์
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  02-345-9090
                </Typography>
              </Box>
            </Box>
          </Card>

          <Card className="p-6 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
            <Box className="flex items-center space-x-4">
              <Box className="bg-blue-100 p-4 rounded-full">
                <MapPin className="text-blue-600" size={32} />
              </Box>
              <Box>
                <Typography variant="h6" className="font-bold text-gray-800">
                  ที่อยู่
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  66/396 ถนนธาตุทอง แขวงบางเมือง <br />
                  สมุทรปราการ 10270
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUs;
