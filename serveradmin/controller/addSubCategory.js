const express = require('express');
const SubCategoryModel = require("../models/SubCategoryModel");
const removeVietNamese = require('../utils');
async function addSubCategory(request, response){
    try{
const {namesubcate, categoryId} = request.body
const checkNamesubcate = await SubCategoryModel.findOne({namesubcate})
if(checkNamesubcate){
    return response.status(400).json({
        message:"Tên danh mục con đã tồn tại",
        error: true
    })
}
const slug = removeVietNamese(namesubcate);

const payload ={
    namesubcate,
    slug,
    categories: [categoryId]
}
const subcategory = new SubCategoryModel(payload)
const subcateSave = await subcategory.save()
return response.status(201).json({
   message : "Thêm thành công",
   data:subcateSave,
   success : true
})
}catch(error){
        return response.status(500).json({

            message : error.message || error,
            error : true
        })
    }
}
module.exports = addSubCategory;