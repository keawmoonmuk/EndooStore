const prisma = require("../configs/prisma");

// ฟังก์ชันนี้ใช้สำหรับเปลี่ยนสถานะคำสั่งซื้อ
exports.changeOrderStatus = async (req, res) => {
  try {

    // step 1: ดึงข้อมูล orderId และ orderStatus จาก body ของ request
    const { orderId, orderStatus } = req.body;

    console.log(orderId, orderStatus);

    // step 2: อัปเดตข้อมูลสถานะคำสั่งซื้อในฐานข้อมูล โดยค้นหาจาก orderId
    const orderUpdate = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: orderStatus,   // อัปเดตสถานะของคำสั่งซื้อด้วยค่าที่ส่งมาใน request
      },
    });

    // step 3: ส่งข้อมูลที่อัปเดตแล้วกลับไปที่ front-end ในรูปแบบ JSON
    res.json({
      orderUpdate,
    });
  } catch (error) {
    console.log("Failed to change order status");
    res.status(500).json({
      message: "Server Error changing order status",
    });
  }
};

// ฟังก์ชันนี้ใช้สำหรับดึงข้อมูลคำสั่งซื้อทั้งหมดสำหรับแอดมิน
exports.getOrderAdmin = async (req, res) => {
  try {

    // step 1: ค้นหาคำสั่งซื้อทั้งหมดจากฐานข้อมูล
    const orders = await prisma.order.findMany({
        include:{
           // step 2: รวมข้อมูลผลิตภัณฑ์ในคำสั่งซื้อแต่ละรายการ
            products: {
                include: {
                    product: true   // ดึงข้อมูลผลิตภัณฑ์แต่ละชิ้นที่เกี่ยวข้องกับคำสั่งซื้อนั้นๆ
                }
            },

            // step 3: รวมข้อมูลผู้สั่งซื้อ
            orderedBy:{
                select: {
                    id: true,
                    email: true,
                    address: true
                }
            }
        }
    });

    // step 4: ส่งข้อมูลคำสั่งซื้อทั้งหมดในรูปแบบ JSON กลับไปที่ front-end
    res.json({
        orders
    })
  } catch (error) {
    console.log("failed to get order admin");
    res.status(500).json({
      message: "Server Error getting order admin",
    });
  }
};
