const { CardModel } = require("../models/CardModel");

async function getCardByName(req, res) {
  const { slug } = req.params;
  try {
    const card = await CardModel.findOne({ slug: slug });
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Thiệp không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getCardByName;
