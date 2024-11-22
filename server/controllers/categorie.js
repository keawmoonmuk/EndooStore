const prisma = require("../configs/prisma");

//add prodocut
exports.create = async (req, res) => {
  try {
    const { name } = req.body
    const category = await prisma.category.create({
        data:{
            name: name
        }
    })
    res.send(category)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error Create category error",
    });
  }
};

exports.list = async (req, res) => {
  try {
    const listCategory = await prisma.category.findMany();

    res.send(listCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error List category",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    // console.log(req.params.id);
    const { id } = req.params;
    const categoryRemove = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    res.send(categoryRemove);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Severe error removing",
    });
  }
};
