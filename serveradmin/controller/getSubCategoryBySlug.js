const SubCategoryModel = require("../models/SubCategoryModel");

async function getSubCategoryByName(req, res) {
  const { slug } = req.params;
  try {
    const subcategory = await SubCategoryModel.findOne({ slug: slug });
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Danh mục con không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getSubCategoryByName;
