const AccountModel = require("../models/AccountModel");
const bcryptjs = require("bcryptjs");

async function updateUserById(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const checkName = await AccountModel.findOne({
            name,
            _id: { $ne: id },
        });
        if (checkName) {
            return res.status(400).json({
                success: false,
                message: "Tên đăng nhập đã tồn tại",
            });
        }
        const checkEmail = await AccountModel.findOne({
            email,
            _id: { $ne: id },
        });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "Email đã được sử dụng",
            });
        }

        const user = await AccountModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
        }

        await user.save();

        return res.status(200).json({ success: true, message: "Cập nhật thành công", data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = updateUserById;
