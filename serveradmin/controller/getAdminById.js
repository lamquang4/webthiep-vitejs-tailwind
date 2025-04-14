const AccountModel = require("../models/AccountModel");

async function getAdminById(req, res) {
    const { id } = req.params;
    try {
        const admin = await AccountModel.findById(id);
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

module.exports = getAdminById;
