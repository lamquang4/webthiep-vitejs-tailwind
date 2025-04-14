const AccountModel = require("../models/AccountModel");

async function getAllUsers(req, res) {
    try {
        const users = await AccountModel.find({ type: { $in: ["user", "user-google"] } });
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true
        });
    }
}

module.exports = getAllUsers;
