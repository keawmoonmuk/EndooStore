import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Grid,
} from "@mui/material";
import { Info, History, Users, Handshake, Target, Award, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <Container maxWidth="lg" className="py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <Typography variant="h2" className="font-bold mb-4 text-blue-600">
          เกี่ยวกับเรา
        </Typography>
        <Typography variant="h5" className="text-gray-600 max-w-2xl mx-auto">
          เราคือผู้นำด้านการจำหน่ายสินค้าออนไลน์ที่มุ่งมั่นสร้างประสบการณ์ที่ดีที่สุดให้กับลูกค้า
        </Typography>
      </div>

      {/* Core Values */}
      <Grid container spacing={4} className="mb-16">
        <Grid item xs={12} md={4}>
          <Card className="h-full transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl">
            <CardContent className="text-center p-6">
              <Box className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="text-blue-600 w-8 h-8" />
              </Box>
              <Typography variant="h5" className="font-bold mb-3">
                วิสัยทัศน์
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                มุ่งมั่นเป็นผู้นำด้าน E-commerce ที่สร้างความแตกต่างด้วยนวัตกรรมและการบริการที่เป็นเลิศ
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl">
            <CardContent className="text-center p-6">
              <Box className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="text-green-600 w-8 h-8" />
              </Box>
              <Typography variant="h5" className="font-bold mb-3">
                พันธกิจ
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                สร้างประสบการณ์การช้อปปิ้งที่สะดวก ปลอดภัย และน่าประทับใจให้กับลูกค้าทุกคน
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl">
            <CardContent className="text-center p-6">
              <Box className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="text-red-600 w-8 h-8" />
              </Box>
              <Typography variant="h5" className="font-bold mb-3">
                ค่านิยม
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                ซื่อสัตย์ โปร่งใส ใส่ใจคุณภาพ และมุ่งมั่นพัฒนาอย่างไม่หยุดยั้ง
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* History Section */}
      <Box className="mb-16">
        <Typography variant="h4" className="text-center font-bold mb-8 text-blue-600">
          เส้นทางแห่งความสำเร็จ
        </Typography>
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
                  alt="Our Journey"
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-bold mb-4">
                  จากจุดเริ่มต้นสู่ความสำเร็จ
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-4">
                  ก่อตั้งในปี 2010 โดย คุณเกรียงไกร ด้วยวิสัยทัศน์ที่ต้องการปฏิวัติวงการ E-commerce ในประเทศไทย
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  ปัจจุบันเราเติบโตขึ้นอย่างต่อเนื่อง พร้อมทีมงานมืออาชีพที่มุ่งมั่นสร้างสรรค์ประสบการณ์ที่ดีที่สุดให้กับลูกค้า
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography variant="h4" className="text-center font-bold mb-8 text-blue-600">
          ทีมผู้บริหาร
        </Typography>
        <Box className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Executive 1 */}
          <Card className="transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl overflow-hidden">
            <Box className="relative">
              <Avatar
                alt="เกรียงไกร"
                src="https://cdn.pixabay.com/photo/2022/07/04/04/37/musician-7300353_640.jpg"
                sx={{ width: 160, height: 160 }}
                className="mx-auto mt-6 border-4 border-white shadow-lg"
              />
            </Box>
            <CardContent className="text-center p-6">
              <Typography variant="h6" className="font-bold mb-2">
                เกรียงไกร
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-3">
                CEO & ผู้ก่อตั้ง
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                "มุ่งมั่นสร้างสรรค์นวัตกรรมเพื่อก้าวสู่อนาคต"
              </Typography>
            </CardContent>
          </Card>

          {/* Executive 2 */}
          <Card className="transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl overflow-hidden">
            <Box className="relative">
              <Avatar
                alt="โคล พาร์เมอร์"
                src="https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_640.jpg"
                sx={{ width: 160, height: 160 }}
                className="mx-auto mt-6 border-4 border-white shadow-lg"
              />
            </Box>
            <CardContent className="text-center p-6">
              <Typography variant="h6" className="font-bold mb-2">
                โคล พาร์เมอร์
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-3">
                Co-Founder & CTO
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                "เทคโนโลยีคือหัวใจของการพัฒนา"
              </Typography>
            </CardContent>
          </Card>

          {/* Executive 3 */}
          <Card className="transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl overflow-hidden">
            <Box className="relative">
              <Avatar
                alt="ดร็อกบา"
                src="https://cdn.pixabay.com/photo/2017/07/26/16/32/woman-2542252_640.jpg"
                sx={{ width: 160, height: 160 }}
                className="mx-auto mt-6 border-4 border-white shadow-lg"
              />
            </Box>
            <CardContent className="text-center p-6">
              <Typography variant="h6" className="font-bold mb-2">
                ดร็อกบา
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-3">
                หัวหน้าฝ่ายออกแบบ
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                "ดีไซน์ที่ดีสร้างประสบการณ์ที่ดี"
              </Typography>
            </CardContent>
          </Card>

          {/* Executive 4 */}
          <Card className="transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-xl overflow-hidden">
            <Box className="relative">
              <Avatar
                alt="พรพรรณ"
                src="https://cdn.pixabay.com/photo/2018/05/04/12/21/man-3373868_640.jpg"
                sx={{ width: 160, height: 160 }}
                className="mx-auto mt-6 border-4 border-white shadow-lg"
              />
            </Box>
            <CardContent className="text-center p-6">
              <Typography variant="h6" className="font-bold mb-2">
                พรพรรณ
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-3">
                ผู้จัดการฝ่ายการตลาด
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                "การตลาดที่ดีคือการสร้างความสัมพันธ์"
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
