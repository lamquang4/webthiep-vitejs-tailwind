const { CardModel } = require("../models/CardModel");
const SubCategoryModel = require("../models/SubCategoryModel");

async function getCardsBySubCategory(req, res) {
  try {
    const { name } = req.params;

    const subcategory = await SubCategoryModel.findOne({ slug: name });
    if (subcategory) {
      const cards = await CardModel.find({ 'subcategories': subcategory._id, status: 1 });
      return res.status(200).json({ success: true, data: cards });
    }

    return res.status(404).json({ success: false, message: 'Danh mục con không tìm thấy' });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
}

module.exports = getCardsBySubCategory;
