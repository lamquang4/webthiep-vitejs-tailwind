const AccountModel = require("../models/AccountModel");

async function getAllAdmins(req, res) {
    try {
        const admins = await AccountModel.find({ type: "admin" });
        return res.status(200).json({
            success: true,
            data: admins
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true
        });
    }
}

module.exports = getAllAdmins;
