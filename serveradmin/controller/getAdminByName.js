const AccountModel = require("../models/AccountModel");

async function getAdminByName(req, res) {
    const { name } = req.params;
    try {
        const admin = await AccountModel.findOne({ name: name });;
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Quản trị viên không tồn tại",
            });
        }
        return res.status(200).json({
            success: true,
            data: admin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = getAdminByName;
