const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/AccountModel");

async function login(request, response) {
  try {
    const { email, password } = request.body;

    const user = await AccountModel.findOne({ email, type: "user" });

    if (!user) {
      return response.status(400).json({
        message: "Mật khẩu hoặc email sai",
        error: true,
      });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return response.status(400).json({
        message: "Mật khẩu hoặc email sai",
        error: true,
      });
    }

    if (user.status === 0) {
      return response.status(400).json({
        message: "Tài khoản của bạn đã bị khóa",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      status: user.status,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    return response
      .cookie("token_user", token, cookieOptions)
      .status(200)
      .json({
        token: token,
        success: true,
      });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
    });
  }
}

module.exports = login;
