const {CardModel} = require('../models/CardModel');

const visibleCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'number' || ![0, 1].includes(status)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu status không hợp lệ' });
    }

    const card = await CardModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ success: false, message: 'Thiệp không tồn tại' });
    }

    res.status(200).json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server', error });
  }
};

module.exports =  visibleCardById;
