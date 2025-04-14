const CategoryModel = require("../models/CategoryModel");

async function updateCategoryById(req, res) {
    const { id } = req.params;
    const { namecate } = req.body;


    try {

        const checkNamecate = await CategoryModel.findOne({
            namecate,
            _id: { $ne: id },
        });
        if (checkNamecate) {
            return res.status(400).json({
                success: false,
                message: "Tên danh mục cha đã tồn tại",
            });
        }

        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Danh mục cha không tồn tại" });
        }

        category.namecate = namecate || category.namecate;

        await category.save();

        return res.status(200).json({ success: true, message: "Cập nhật thành công", data: category });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = updateCategoryById;
