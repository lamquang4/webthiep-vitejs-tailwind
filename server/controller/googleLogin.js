const jwt = require('jsonwebtoken');
const AccountModel = require("../models/AccountModel");

async function googleLogin(request, response) {
    try {
        const { email, name } = request.body;

        let user = await AccountModel.findOne({ email });

        if (user && user.password) {
            return response.status(400).json({
                message: "Email này đã được dùng để tạo tài khoản!",
                error: true
            });
        }

        if (!user) {
            user = new AccountModel({
                name,
                email,
                password: "",  
                type: "user-google",
                status: 1
            });
            await user.save();
        }

        if (user.status === 0) {
            return response.status(400).json({
                message: "Tài khoản của bạn đã bị khóa",
                error: true
            });
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            status: user.status,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: '/'
        };

        return response.cookie('token_user', token, cookieOptions).status(200).json({
            token,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message,
            error: true
        });
    }
}

module.exports = googleLogin;
