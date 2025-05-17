const CategoryModel = require("../models/CategoryModel");

async function getCategoryByName(req, res) {
  const { slug } = req.params;
  try {
    const category = await CategoryModel.findOne({ slug: slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục cha không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getCategoryByName;
