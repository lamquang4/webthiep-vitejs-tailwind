const AccountModel = require("../models/AccountModel");

async function getUserByName(req, res) {
    const { name } = req.params;
    try {
        const user = await AccountModel.findOne({ name: name });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Người dùng không tồn tại",
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = getUserByName;
