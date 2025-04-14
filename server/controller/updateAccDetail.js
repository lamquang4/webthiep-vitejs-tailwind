const getAccountDetailsFromToken = require("../helpers/getAccountDetailsFromToken")
const AccountModel = require("../models/AccountModel")

async function updateAccDetail(request,response){
    try {
        const token = request.cookies.token_user || ""

        const user = await getAccountDetailsFromToken(token)

        const { name, email } = request.body


        const existingUser = await AccountModel.findById(user._id);

        const checkName = await AccountModel.findOne({
            name,
            _id: { $ne: user._id }, 
        });

        if(checkName){
            return response.status(400).json({
                message:"Tên đăng nhập đã tồn tại.",
                error: true
            })
        }

        const checkEmail = await AccountModel.findOne({
            email,
            _id: { $ne: user._id }, 
        });

        if(checkEmail){
            return response.status(400).json({
                message:"Email đã được sử dụng.",
                error: true
            })
        }
        
        const updateUser = await AccountModel.updateOne({ _id : user._id },{
            name,
            email
        })

        const userInformation = await AccountModel.findById(user._id)

        return response.json({
            message : "Cập nhật thành công!",
            data : userInformation,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = updateAccDetail