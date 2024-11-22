const jwt = require("jsonwebtoken");
const prisma = require("../configs/prisma");

//check ธรรมดา
exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    //console.log(headerToken);

    if (!headerToken) {
    return  res.status(401).json({
        message: "No Token, Authorization",
      });
    }
    const token = headerToken.split(" ")[1]; //get token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeToken; //เพื่อให้ใช้ได้ในหลายหน้า

    //find user in database
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
    });

    if (!user.enabled) {
    return  res.status(400).json({
        message: "User not enabled",
      });
    }

    // console.log(decodeToken);
    // console.log(user);
    // console.log("hello middleware");
    next();
  } catch (error) {
    console.log("server error: " + error);
  return  res.status(500).json({
      message: "Server error Token Invalid ",
    });
  }
};

//check แบบ admin
exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({
        message: "Acess Denied : admin only",
      });
    }
    

    console.log("admin check", adminUser);

    next();
  } catch (error) {
    console.log("server error andmincheck");
  return  res.status(500).json({
      message: "Server Error Admin check",
    });
  }
};
