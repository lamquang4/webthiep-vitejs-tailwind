const SaveCardModel = require("../models/SaveCardModel");

const deleteCardSave = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSaveCard = await SaveCardModel.findByIdAndDelete(id);

    if (!deleteSaveCard) {
      return res
        .status(404)
        .json({ success: false, message: "Thiệp lưu không tồn tại." });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Xóa thiệp lưu thành công.",
        data: deleteSaveCard,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server.", error });
  }
};

module.exports = deleteCardSave;
