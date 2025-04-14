const CategoryModel = require("../models/CategoryModel");

async function getAllCategories(req, res) {
  try {
    const categories = await CategoryModel.find({ status: 1 });
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
}

module.exports = getAllCategories;
