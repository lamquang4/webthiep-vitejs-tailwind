const { CardModel } = require('../models/CardModel');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '../../public/uploads/thiep');

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await CardModel.findById(id);

    if (!card) {
      return res.status(404).json({ success: false, message: "Thiệp không tồn tại" });
    }

    const mainImagePath = path.join(uploadPath, card.image);
    const subImagePath = card.image1 ? path.join(uploadPath, card.image1) : null;

    if (fs.existsSync(mainImagePath)) {
      fs.unlinkSync(mainImagePath);
    }
    if (fs.existsSync(subImagePath)) {
      fs.unlinkSync(subImagePath);
    }

    await CardModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Xóa thiệp thành công.", data: card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

module.exports = deleteCard;
