const SubCategoryModel = require("../models/SubCategoryModel");
const removeVietNamese = require("../utils");
async function updateSubCategoryBySlug(req, res) {
  const { slug } = req.params;
  const { namesubcate, categoryId } = req.body;

  try {
    const checkNamesubcate = await SubCategoryModel.findOne({
      namesubcate,
      slug: { $ne: slug },
    });
    if (checkNamesubcate) {
      return res.status(400).json({
        success: false,
        message: "Tên danh mục con đã tồn tại",
      });
    }

    const subcategory = await SubCategoryModel.findOne({ slug: slug });
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Danh mục con không tồn tại" });
    }

    const newSlug = removeVietNamese(namesubcate);

    subcategory.namesubcate = namesubcate || subcategory.namesubcate;
    subcategory.slug = newSlug || subcategory.slug;
    subcategory.categories = categoryId || subcategory.categories;

    await subcategory.save();

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: subcategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = updateSubCategoryBySlug;
