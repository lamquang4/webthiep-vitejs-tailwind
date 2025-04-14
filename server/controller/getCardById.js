const {CardModel} = require("../models/CardModel");
const SaveCardModel = require("../models/SaveCardModel");
async function getCardById(req, res) {
    const { id } = req.params;
    try {
        const card = await CardModel.findById(id);
        if (card) {
            return res.status(200).json({
                success: true,
                data: card,
            });
        }

        const savecard = await SaveCardModel.findById(id).populate("idcard");
        if (savecard) {
            return res.status(200).json({
                success: true,
                data: savecard,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = getCardById;
