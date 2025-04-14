const express = require('express');
const AccountModel = require("../models/AccountModel");
const bcryptjs = require("bcryptjs"); 

async function register(request, response){
    try{
const {name, email, password} = request.body
const checkEmail = await AccountModel.findOne({email})
if(checkEmail){
    return response.status(400).json({
        message:"Email đã được sử dụng",
        error: true
    })
}

const salt = await bcryptjs.genSalt(10)
const hashpassword = await bcryptjs.hash(password, salt)
const payload ={
    name,
    email,
    password : hashpassword,
    type: "user",
    status: 1
}
const user = new AccountModel(payload)
const userSave = await user.save()
return response.status(201).json({
   message : "Đăng kí thành công",
   data:userSave,
   success : true
})
}catch(error){
        return response.status(500).json({

            message : error.message || error,
            error : true
        })
    }
}
module.exports = register