const jwt = require('jsonwebtoken');
const AccountModel = require('../models/AccountModel');

const getAccountAdminDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session expired, please log in again.",
            logout: true,
        };
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await AccountModel.findById(decode.id).select('-password');
        if (user.type == "admin") {
            return user;
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                message: "Session expired, please log in again.",
                logout: true,
            };
        }
     
        return {
            message: "Invalid token",
            logout: true,
        };
    }
};

module.exports = getAccountAdminDetailsFromToken;