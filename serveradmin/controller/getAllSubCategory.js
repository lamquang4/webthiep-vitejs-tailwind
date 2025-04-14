const SubCategoryModel = require("../models/SubCategoryModel");

async function getAllSubCategories(req, res) {
  try {
    const subcategories = await SubCategoryModel.find();
    return res.status(200).json({
      success: true,
      data: subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
}

module.exports = getAllSubCategories;
