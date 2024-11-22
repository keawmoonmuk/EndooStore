import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const Blog = () => {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogPosts = [
    {
      title: "การพัฒนาเว็บในปี 2024",
      date: "2024-11-01",
      description:
        "เรียนรู้เกี่ยวกับเทรนด์การพัฒนาเว็บในปี 2024 และเครื่องมือใหม่ที่น่าสนใจ...",
      content:
        "บทความนี้จะพูดถึงวิธีการพัฒนาเว็บในปี 2024 พร้อมเทคโนโลยีใหม่ๆ เช่น Jamstack, Serverless, และเครื่องมือพัฒนาอื่นๆ...",
      image: "https://cdn.pixabay.com/photo/2024/06/01/09/32/ai-generated-8801915_640.jpg",
    },
    {
      title: "การออกแบบ UI/UX ให้ดี",
      date: "2024-10-15",
      description:
        "เข้าใจหลักการสำคัญในการออกแบบ UI/UX ที่สามารถเพิ่มประสิทธิภาพให้กับผู้ใช้...",
      content:
        "UI/UX เป็นสิ่งที่สำคัญมากในการพัฒนาเว็บหรือแอปพลิเคชัน เราจะพูดถึงเทคนิคและหลักการในการออกแบบ UI/UX ที่ดี...",
      image: "https://media.istockphoto.com/id/1677556215/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B9%82%E0%B8%AE%E0%B9%82%E0%B8%A5%E0%B9%81%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%94%E0%B8%B4%E0%B8%88%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%A5%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%9F%E0%B8%8B-hud.jpg?s=612x612&w=0&k=20&c=_B7ek8cPzWi2b9W_RNnV_6YX3gLhQ4_NRquTRVuQcwY=",
    },
    {
      title: "การใช้ React.js ในการสร้างแอปพลิเคชัน",
      date: "2024-09-25",
      description:
        "มาทำความรู้จักกับ React.js และวิธีการใช้งานสำหรับสร้างเว็บแอปพลิเคชัน...",
      content:
        "React.js เป็น JavaScript library ที่ได้รับความนิยมมากในการสร้างเว็บแอปพลิเคชัน เราจะมาทำความรู้จักกับ React.js และการใช้งานเบื้องต้น...",
      image: "https://cdn.pixabay.com/photo/2021/09/05/17/26/video-6600037_640.png",
    },
    {
      title: "การพัฒนาแอปพลิเคชันบนมือถือด้วย Flutter",
      date: "2024-09-10",
      description:
        "ทำความรู้จักกับ Flutter และวิธีการพัฒนาแอปพลิเคชันมือถือแบบข้ามแพลตฟอร์ม...",
      content:
        "Flutter เป็นเครื่องมือพัฒนาแอปพลิเคชันมือถือที่ช่วยให้เราสามารถพัฒนาแอปได้ทั้งบน Android และ iOS โดยใช้โค้ดเบสเดียว...",
      image: "https://media.istockphoto.com/id/1515913422/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%B0%E0%B8%AB%E0%B9%8C%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%80%E0%B8%97%E0%B8%84%E0%B9%82%E0%B8%99%E0%B9%82%E0%B8%A5%E0%B8%A2%E0%B8%B5-ai-%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%97%E0%B9%8D%E0%B8%B2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%B0%E0%B8%AB%E0%B9%8C%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5.jpg?s=2048x2048&w=is&k=20&c=tGwNFdQU-ekX6JY2Hx3s6s6OJPKcuY5HmigfH3C0Jj8=",
    },
    {
      title: "เทคนิคการเพิ่มประสิทธิภาพเว็บไซต์",
      date: "2024-08-30",
      description:
        "ค้นพบเทคนิคและเครื่องมือในการเพิ่มประสิทธิภาพให้กับเว็บไซต์ของคุณ...",
      content:
        "การเพิ่มประสิทธิภาพเว็บไซต์ไม่ใช่แค่การโหลดเร็วขึ้น แต่ยังรวมถึงการปรับแต่งการเข้าถึงและการใช้งานได้ง่าย...",
      image: "https://media.istockphoto.com/id/1486796570/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9A%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B5%E0%B9%89%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81-%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%80%E0%B8%A1%E0%B8%95%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%9A%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2.jpg?s=612x612&w=0&k=20&c=hOtm7PlySJ0Ybd98jyNSuPDnosyL9jINmXhVXVgtMM8=",
    },
  ];
  const handleClickOpen = (blog) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center mb-8 font-semibold">บล็อกของเรา</h1>

      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="shadow-lg rounded-lg cursor-pointer" onClick={() => handleClickOpen(post)}>
              <CardMedia
                component="img"
                alt={post.title}
                height="200"
                image={post.image}
                title={post.title}
                sx={{
                  height: 200, // กำหนดความสูงของรูป
                  width: '100%', // กำหนดความกว้างของรูปให้เต็มพื้นที่
                  objectFit: 'cover', // ทำให้รูปไม่ผิดสัดส่วนเมื่อขนาดเปลี่ยน
                }}
              />
              <CardContent>
                <Typography variant="h6" className="font-semibold">{post.title}</Typography>
                <Typography variant="body2" color="textSecondary">{post.date}</Typography>
                <Typography variant="body1" className="mt-2">{post.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog to read the full blog post */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedBlog?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">{selectedBlog?.date}</Typography>
          <Typography variant="body1" className="mt-4">{selectedBlog?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blog;
