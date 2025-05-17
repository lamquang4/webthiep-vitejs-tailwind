const AccountModel = require("../models/AccountModel");
const bcryptjs = require("bcryptjs");

async function updateAdminByName(req, res) {
  const { name1 } = req.params;
  const { name, email, password } = req.body;

  try {
    const checkName = await AccountModel.findOne({
      name,
      name: { $ne: name1 },
    });
    if (checkName) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập đã tồn tại",
      });
    }
    const checkEmail = await AccountModel.findOne({
      email,
      name: { $ne: name1 },
    });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }

    const admin = await AccountModel.findById(id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Quản trị viên không tồn tại" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      admin.password = await bcryptjs.hash(password, salt);
    }

    await admin.save();

    return res
      .status(200)
      .json({ success: true, message: "Cập nhật thành công", data: admin });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = updateAdminByName;
