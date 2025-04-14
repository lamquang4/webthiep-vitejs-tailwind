const SubCategoryModel = require('../models/SubCategoryModel');

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ success: false, message: "Danh mục con không tồn tại." });
    }

    res.status(200).json({ success: true, message: "Xóa danh mục con thành công.", data: deletedSubCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server.", error });
  }
};

module.exports = deleteSubCategory;
