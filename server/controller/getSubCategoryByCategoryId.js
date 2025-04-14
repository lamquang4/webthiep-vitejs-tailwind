const SubCategoryModel = require("../models/SubCategoryModel");

async function getSubCategoryByCategoryId(req, res) {
    try {
        const { categoryId } = req.params;
        const subcategories = await SubCategoryModel.find({ categories: categoryId });

        return res.status(200).json({
            success: true,
            data: subcategories
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true
        });
    }
}

module.exports = getSubCategoryByCategoryId;
