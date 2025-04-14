const SaveCardModel = require("../models/SaveCardModel");

async function getCardSaveById(req, res) {
    const { id } = req.params;
    try {
        const savecard = await SaveCardModel.findById(id).populate("idcard");

        if (!savecard) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thiệp đã lưu",
            });
        }

        return res.status(200).json({
            success: true,
            data: savecard,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = getCardSaveById;
