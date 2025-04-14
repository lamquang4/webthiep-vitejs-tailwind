const express = require('express');
const CategoryModel = require("../models/CategoryModel");

async function addCategory(request, response){
    try{
const {namecate} = request.body
const checkNamecate = await CategoryModel.findOne({namecate})
if(checkNamecate){
    return response.status(400).json({
        message:"Tên danh mục cha đã tồn tại",
        error: true
    })
}

const payload ={
    namecate,
    status: 0
}
const category = new CategoryModel(payload)
const cateSave = await category.save()
return response.status(201).json({
   message : "Thêm thành công",
   data:cateSave,
   success : true
})
}catch(error){
        return response.status(500).json({

            message : error.message || error,
            error : true
        })
    }
}
module.exports = addCategory;