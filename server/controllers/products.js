const { query } = require("express");
const prisma = require("../configs/prisma");
const cloudinary = require("cloudinary").v2; //use cloudinary to upload images

// Configuration cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// Configuration
cloudinary.config({
  cloud_name: "dkmr7porz",
  api_key: "454146472843823",
  api_secret: "cm24Y-Er-oL01Med6cgDt8sc1Qs",
});

// ฟังก์ชันสำหรับสร้างสินค้าใหม่
exports.createProduct = async (req, res) => {
  try {
    // ดึงข้อมูลจาก body
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    //step 1 : ตรวจสอบว่า categoryId มีอยู่ในฐานข้อมูล
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      return res.status(400).json({ message: "หมวดหมู่ไม่ถูกต้อง" });
    }

    // step 2: สร้างข้อมูลสินค้าใหม่ในฐานข้อมูล
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId), //หมวดหมู่
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.json({
      product,
      message: "add product successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Created product",
    });
  }
};

//ดึงข้อฒูล products ทั้งหมด ตามเงื่อนไขเช่น ต้องการแค่ 10  --// ฟังก์ชันดึงข้อมูลสินค้าทั้งหมด โดยจำกัดจำนวนตามที่ระบุ
exports.listProducts = async (req, res) => {
  try {
    const { count } = req.params; //จำนวนที่จะนำมาแสดง
    // console.log(count);

    //เลือกข้อมูลในการค้นหา เช่น count = 10
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error List Products",
    });
  }
};

//ดึงข้อมูลแค่ product เดียว
exports.listProduct = async (req, res) => {
  try {
    const { id } = req.params; //จำนวนที่จะนำมาแสดง
    // console.log(count);

    const products = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
        images: true,
      },
    });

    // ตรวจสอบว่า products มีค่า null หรือไม่
    if (!products) {
      return res.status(404).send({
        message: "ไม่พบสินค้าที่ต้องการ",
      });
    }

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error List Products",
    });
  }
};

//ลบ ข้อมูล product
exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //step 1 : ค้นหาสินค้า include images
    const product = await prisma.product.findFirst({
      where: { id: Number(id) },
      include: { images: true },
    });

    //ถ้าไม่มี product
    if (!product) {
      return res.status(400).json({ message: "Product not found!!" });
    }

    //console.log(product);

    //step 2 : Promise ลบรูปภาพใน cloud ลบแบบ asyne ,await
    const deletedImage = product.images.map(
      (image) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(image.public_id, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        })
    );
    

    await Promise.all(deletedImage)
    // Step 3 ลบสินค้า
    await prisma.product.delete({
        where: {
            id: Number(id)
        }
    })

    res.send("delete product successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Removing Product",
    });
  }
};

// ฟังก์ชันสำหรับแก้ไขข้อมูลสินค้า
exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    const { id } = req.params;

    // ลบรูปภาพเก่าที่เกี่ยวข้องกับสินค้าออกก่อน
    await prisma.image.deleteMany({
      where: {
        productId: parseInt(id),
      },
    });

    // อัปเดตข้อมูลสินค้าในฐานข้อมูล
    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId), //หมวดหมู่
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sever Error Update product",
    });
  }
};

// ฟังก์ชันดึงสินค้าตามการจัดเรียงและจำนวนที่ต้องการ
exports.listProductbyfilter = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    console.log(sort, order, limit);

    // ดึงข้อมูลสินค้าตามการจัดเรียงและจำนวนที่กำหนด
    const products = await prisma.product.findMany({
      take: limit, // จำกัดจำนวนสินค้า
      orderBy: {
        [sort]: order, // จัดเรียงสินค้า
      },
      include: {
        category: true, // รวมข้อมูลหมวดหมู่สินค้า
        images: true
      },
    });

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error List product by filtter",
    });
  }
};

//ฟังก์ชันค้นหาสินค้าด้วยชื่อ  title
const handleQuery = async (req, res, query) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        title: {
          contains: query, // ใช้การค้นหาที่มีคำที่ตรงกับชื่อสินค้า
        },
      },
      include: {
        category: true, // รวมข้อมูลหมวดหมู่สินค้า
        images: true, // รวมข้อมูลรูปภาพสินค้า
      },
    });

    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Search query error",
    });
  }
};

//ฟังก์ชันค้นหาสินค้าด้วย ราคา  เป็นข้อมูล []  เช่น [100,50000]
const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0], //ต่ำสุด
          lte: priceRange[1], // สุดสุด
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    res.send(products);
  } catch (error) {
    console.log("server error");
    res.status(500).json({
      message: "Server Error serach price error",
    });
  }
};

//// ฟังก์ชันค้นหาสินค้าด้วย หมวดหมู่ สินค้า สามารถเลือกได้หลาย หมวดหมู่ เป็นข้อมูล []
const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    res.send(products);
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({
      message: "Server Error serach price error",
    });
  }
};

//  searchProductFiltter
exports.searchProductFiltter = async (req, res) => {
  try {
    const { query, category, price } = req.body;

    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query); //เรียกใช้ function title
    }

    if (category) {
      console.log("category-->", category);
      await handleCategory(req, res, category); //เรียกใช้ function category
    }

    if (price) {
      console.log("price-->", price);
      await handlePrice(req, res, price); //เรียกใช้ function price
    }

    // res.send("search  products controller");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Search product filtter",
    });
  }
};

//createImage
exports.createImages = async (req, res) => {
  //console.log(req.body.image);

  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `dev-${Date.now()}`,
      resource_type: "auto",
      folder: "e-commerce/images",
    });
    res.send(result);
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(error.http_code || 500).json({
      message: error.message || "Server Error",
    });
  }
};

//remove image
exports.removeImage = async (req, res) => {
  try {
    res.send("hello remove image");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
