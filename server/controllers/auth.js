const prisma = require("../configs/prisma.js");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");

// register : ใช้สำหรับลงทะเบียนผู้ใช้ใหม่
exports.register = async (req, res) => {
  try {
    // ดึงค่า email และ password ที่ผู้ใช้กรอกจาก request body
    const { email, password } = req.body;

    // step 1: ตรวจสอบว่ามีการส่ง email และ password มาในคำขอหรือไม่
    if (!email) {
      return res.status(400).json({
        message: "Email is required", // ส่งข้อความแจ้งเตือนเมื่อไม่มีการกรอก email
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required", // ส่งข้อความแจ้งเตือนเมื่อไม่มีการกรอก password
      });
    }

    // step 2: ตรวจสอบว่า email นี้มีอยู่ในฐานข้อมูลหรือยัง
    const user = await prisma.user.findFirst({
      where: {
        email: email, // ค้นหา user โดยใช้ email เป็นเงื่อนไข
      },
    });

    // ถ้า email นี้มีอยู่ในระบบแล้ว ให้ส่ง error กลับไป
    if (user) {
      return res.status(400).json({
        message: "Email is already exists", // แจ้งว่ามี email นี้ในระบบแล้ว
      });
    }

    // step 3: ทำการ hash password เพื่อความปลอดภัย
    const hashPassword = await bcript.hash(password, 10); // ใช้ bcrypt ในการ hash รหัสผ่าน

    // step 4: บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
    await prisma.user.create({
      data: {
        email: email, // บันทึก email ของผู้ใช้
        password: hashPassword, // บันทึกรหัสผ่านที่ถูก hash แล้ว
      },
    });

    console.log("register successful");

    // ส่งสถานะสำเร็จการลงทะเบียนพร้อมข้อความ
    res.status(201).json({
      message: "register successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error registering",
    });
  }
};

//ใช้สำหรับ : login เข้าใช้งาน
exports.login = async (req, res) => {
  try {

     // ดึงข้อมูล email และ password จาก body ของ request
    const { email, password } = req.body;

    //step 1 : check email  ค้นหาผู้ใช้ในฐานข้อมูลโดยใช้ email ที่ได้รับ
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // ถ้าไม่มี email ในระบบ หรือผู้ใช้ยังไม่เปิดใช้งาน
    if (!user || !user.enabled) {
      return res.status(400).json({
        message: "กรุณากรอก email ให้ถูกต้อง",
      });
    }

    //step 2 : check password   ตรวจสอบว่า password ที่กรอกตรงกับ password ที่เก็บไว้ในฐานข้อมูลหรือไม่
    const isMatch = await bcript.compare(password, user.password);

    // ถ้า password ไม่ตรง
    if (!isMatch) {
      res.status(400).json({
        message: "Password Invaild",
      });
    }

    //step 3 create payload  สร้าง payload สำหรับ JWT โดยรวมข้อมูลผู้ใช้
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    //step 4 generate token  สร้าง JWT token โดยใช้ payload ที่สร้างขึ้น และกำหนดอายุการใช้งานเป็น 1 วัน
    jwt.sign(
      payload,
      process.env.JWT_SECRET,   // ใช้ secret key จาก .env
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            message: "Error generating token: " + err.message,
          });
        }
        // ส่งข้อมูล payload และ token กลับไปยัง client
        res.json({
          payload,
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Logining",
    });
  }
};

//current user
exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: req.user.email },
      select: {
          id: true,
          email: true,
          name: true,
          role: true
      }
  })
  res.json({ user })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error current User",
    });
  }
};


