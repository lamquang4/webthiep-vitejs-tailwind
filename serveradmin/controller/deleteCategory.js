const CategoryModel = require('../models/CategoryModel');

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Danh mục cha không tồn tại." });
    }

    res.status(200).json({ success: true, message: "Xóa danh mục cha thành công.", data: deletedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server.", error });
  }
};

module.exports = deleteCategory;
