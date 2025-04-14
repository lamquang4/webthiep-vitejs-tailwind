const CategoryModel = require('../models/CategoryModel');

const visibleCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'number' || ![0, 1].includes(status)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu status không hợp lệ' });
    }

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Danh mục cha không tồn tại' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ success: false, message: 'Lỗi server', error });
  }
};

module.exports =  visibleCategoryById;
