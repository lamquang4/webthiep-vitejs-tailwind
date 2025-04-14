const AccountModel = require('../models/AccountModel');

const blockUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'number' || ![0, 1].includes(status)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu status không hợp lệ' });
    }

    const user = await AccountModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ success: false, message: 'Lỗi server', error });
  }
};

module.exports =  blockUserById;
