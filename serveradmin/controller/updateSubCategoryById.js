const SubCategoryModel = require("../models/SubCategoryModel");
const removeVietNamese = require('../utils');
async function updateSubCategoryById(req, res) {
    const { id } = req.params;
    const { namesubcate, categoryId } = req.body;

    try {

        const checkNamesubcate = await SubCategoryModel.findOne({
            namesubcate,
            _id: { $ne: id },
        });
        if (checkNamesubcate) {
            return res.status(400).json({
                success: false,
                message: "Tên danh mục con đã tồn tại",
            });
        }

        const subcategory = await SubCategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: "Danh mục con không tồn tại" });
        }

        const slug = removeVietNamese(namesubcate);

        subcategory.namesubcate = namesubcate || subcategory.namesubcate;
        subcategory.slug  = slug || subcategory.slug;
        subcategory.categories = categoryId || subcategory.categories;
      
        await subcategory.save();

        return res.status(200).json({ success: true, message: "Cập nhật thành công", data: subcategory });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = updateSubCategoryById;
