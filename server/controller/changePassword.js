const bcryptjs = require("bcryptjs");
const getAccountDetailsFromToken = require("../helpers/getAccountDetailsFromToken");
const AccountModel = require("../models/AccountModel");

async function changePassword(request, response) {
  try {
    const token = request.cookies.token_user || "";

    const user = await getAccountDetailsFromToken(token);

    const { oldPassword, newPassword } = request.body;

    const account = await AccountModel.findById(user._id);
    if (!account) {
      return response.status(404).json({
        message: "Người dùng không tồn tại.",
        error: true,
      });
    }

    const isPasswordMatch = await bcryptjs.compare(
      oldPassword,
      account.password
    );
    if (!isPasswordMatch) {
      return response.status(400).json({
        message: "Mật khẩu cũ không đúng.",
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    account.password = hashedNewPassword;
    await account.save();

    return response.json({
      message: "Đổi mật khẩu thành công.",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Đã xảy ra lỗi.",
      error: true,
    });
  }
}

module.exports = changePassword;
