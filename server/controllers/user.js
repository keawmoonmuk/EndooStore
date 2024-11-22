const prisma = require("../configs/prisma");

// ฟังก์ชัน listUsers: ใช้ดึงรายชื่อผู้ใช้งานทั้งหมด
exports.listUsers = async (req, res) => {
  try {
    // step 1: ค้นหาผู้ใช้ทั้งหมดจากฐานข้อมูล พร้อมเลือกเฉพาะบางฟิลด์
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
        createdAt :true,
        updatedAt: true
      },
    });

    // step 2: ส่งข้อมูลผู้ใช้ที่หาได้กลับไปที่ front-end
    res.send(users);
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชัน changeStatus: ใช้สำหรับเปลี่ยนสถานะ enabled ของผู้ใช้
exports.changeStatus = async (req, res) => {
  try {
    // step 1: ดึง id และ enabled จาก body ของ request
    const { id, enabled } = req.body;
    //console.log(id, enabled);

    // step 2: อัปเดตสถานะของผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.update({
      where: {
        id: Number(id), // ค้นหาผู้ใช้ด้วย id
      },
      data: {
        enabled: enabled, // อัปเดตสถานะ enabled
      },
    });

    // step 3: ส่งข้อความสำเร็จกลับไป
    res.send("update status successfully");
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชัน changeRole: ใช้สำหรับเปลี่ยน role ของผู้ใช้
exports.changeRole = async (req, res) => {
  try {

    // step 1: ดึง id และ role จาก body ของ request
    const { id, role } = req.body;

    // step 2: อัปเดต role ของผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });

    // step 3: ส่งข้อความสำเร็จกลับไป
    res.send("update role successfully");
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชัน userCart: ใช้สำหรับบันทึกข้อมูลสินค้าที่อยู่ใน cart ของผู้ใช้
exports.userCart = async (req, res) => {
  try {

    // step 1: ดึงข้อมูล cart จาก body ของ request
    const { cart } = req.body;

    // console.log(cart);
    // console.log(req.user.id);

    // step 2: ค้นหาผู้ใช้ด้วย id ที่ล็อกอิน
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.user.id),
      },
    });

       // step check quantity of user
    for (const item of cart) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.id,   // ค้นหาข้อมูลสินค้าตาม productId
        },
        select: {
          quantity: true,   // ดึงจำนวนสินค้าที่มีอยู่
          title: true,      // ดึงชื่อสินค้า
        },
      });
      // console.log(item);
      // console.log(product);
      // ถ้าจำนวนสินค้าที่ซื้อมากกว่าจำนวนที่มีในคลัง
      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          ok: false,
          message: `ขออภัย สินค้า ${product?.title || "product"} หมด`,
        });
      }
    }

    // step 3: ลบสินค้าเก่าใน cart ก่อน
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderedById: user.id,
        },
      },
    });

    // step 4: ลบข้อมูล cart เก่า
    await prisma.cart.deleteMany({
      where: {
        orderedById: user.id,
      },
    });

    // step 5: เตรียมข้อมูลสินค้าที่จะเพิ่มใน cart ใหม่
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));

    // step 6: คำนวณราคาสินค้าทั้งหมดใน cart
    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    // step 7: สร้าง cart ใหม่ในฐานข้อมูล
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderedById: user.id,
      },
    });

    //console.log(cartTotal);
    console.log(newCart);
    // step 8: ส่งข้อความสำเร็จกลับไปที่ front-end
    res.send("add cart success");
  } catch (error) {
    console.log("server error add cart : " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชัน getUserCart: ใช้สำหรับดึงข้อมูล cart ของผู้ใช้
exports.getUserCart = async (req, res) => {
  try {

    // step 1: ค้นหา cart ของผู้ใช้ที่ล็อกอินอยู่
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,  // ดึงข้อมูลสินค้าทั้งหมดใน cart
          },
        },
      },
    });

    console.log(cart);

    // step 2: ส่งข้อมูลสินค้าใน cart และราคาทั้งหมดกลับไปที่ front-end
    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal,
    });
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชัน emptyCart: ใช้สำหรับลบสินค้าใน cart ของผู้ใช้
exports.emptyCart = async (req, res) => {
  try {

    // step 1: ค้นหา cart ของผู้ใช้ที่ล็อกอินอยู่
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),
      },
    });

    // step 2: ตรวจสอบว่ามี cart อยู่หรือไม่
    if (!cart) {
      return res.status(400).json({
        message: "No cart",
      });
    }

    // step 3: ลบสินค้าทั้งหมดใน productOncart
    await prisma.productOnCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    // step 4: ลบสินค้าใน cart
    const result = await prisma.cart.deleteMany({
      where: {
        orderedById: Number(req.user.id),
      },
    });

    console.log(result);

    // step 5: ส่งข้อความสำเร็จพร้อมจำนวนรายการที่ถูกลบกลับไป
    res.json({
      message: "cart empty success",
      deletedCount: result.count,
    });
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชัน saveAddress: ใช้สำหรับบันทึกที่อยู่ของผู้ใช้
exports.saveAddress = async (req, res) => {
  try {

     // step 1: ดึงข้อมูล address จาก body ของ request
    const { address } = req.body;
    console.log(address);

    // step 2: อัปเดตที่อยู่ของผู้ใช้ในฐานข้อมูล
    const addressUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });

    // step 3: ส่งข้อความสำเร็จกลับไป
    res.json({
      ok: true,
      message: "address update success",
    });
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//function Save order
exports.saveOrder = async (req, res) => {
  try {
    //step 0 : check stripe payload
    // console.log(req.body);
    // return res.send("Hello stripe ")
    const {id, amount, status, currency} = req.body.paymentIntent;
    
    // step 1: ดึงข้อมูลตะกร้าของผู้ใช้ (user cart)
    const userCart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),   // ค้นหาตะกร้าตาม ID ของผู้ใช้ที่ล็อกอิน
      },
      include: {
        products: true,    // ดึงข้อมูลสินค้าทั้งหมดในตะกร้าของผู้ใช้
      },
    });

    // ตรวจสอบว่าตะกร้าว่างหรือไม่
    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Cart is Empty",
      });
    }

    const amountTHB = Number(amount) / 100

    // step 3: สร้างคำสั่งซื้อใหม่ในฐานข้อมูล
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderedBy: {
          connect: { id: req.user.id },   // เชื่อมโยงคำสั่งซื้อกับผู้ใช้ที่ล็อกอิน
        },
        cartTotal: userCart.cartTotal,    // บันทึกราคาทั้งหมดของสินค้าจากตะกร้า
        stripePaymentId: id,
        amount: amountTHB,
        status: status,
        currentcy: currency,
      },
    });

    // step 4: เตรียมข้อมูลเพื่ออัปเดตจำนวนสินค้าในคลังและจำนวนที่ขายได้
    const update = await userCart.products.map((item) => ({
      where: {
        id: item.productId, // ค้นหาสินค้าที่ต้องอัปเดต
      },
      data: {
        quantity: { decrement: item.count },    // ลดจำนวนสินค้าในคลังตามที่ถูกสั่งซื้อ
        sold: { increment: item.count },        // เพิ่มจำนวนการขาย
      },  
    }));

    //console.log(update);

    // step 5: อัปเดตสินค้าทั้งหมดในคลังพร้อมกันโดยใช้ Promise.all
    await Promise.all(update.map((updated) => prisma.product.update(updated)));

    // step 6: ลบตะกร้าของผู้ใช้หลังจากสั่งซื้อเสร็จแล้ว
    await prisma.cart.deleteMany({
      where: {
        orderedById: Number(req.user.id),   // ลบตะกร้าของผู้ใช้ที่ล็อกอิน
      },
    });

    // ส่งข้อมูลคำสั่งซื้อกลับไปให้ฝั่ง client
    res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ฟังก์ชันนี้ใช้เพื่อดึงข้อมูลคำสั่งซื้อของผู้ใช้
exports.getOrder = async (req, res) => {
  try {

    // ดึงคำสั่งซื้อทั้งหมดของผู้ใช้ที่ล็อกอินอยู่
    const orders = await prisma.order.findMany({
      where: {
        orderedById: Number(req.user.id),   // ค้นหาคำสั่งซื้อจากผู้ใช้ที่ล็อกอิน
      },
      include: {
        products: {
          include: {
            product: true,  // ดึงข้อมูลสินค้าที่เกี่ยวข้องกับคำสั่งซื้อ
          },
        },
      },
    });

    // ถ้าไม่มีคำสั่งซื้อ
    if (orders.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No Order",
      });
    }

    console.log(orders);

    //return หน้าบ้าน
    res.json({
      ok: true,
      orders,
    });
  } catch (error) {
    console.log("server error: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
