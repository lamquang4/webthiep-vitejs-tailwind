const {CardModel} = require("../models/CardModel");

async function getAllCards(req, res) {
    try {
        const cards = await CardModel.find();
        return res.status(200).json({
            success: true,
            data: cards
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true
        });
    }
}

module.exports = getAllCards;
