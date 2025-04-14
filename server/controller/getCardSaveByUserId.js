const SaveCardModel = require("../models/SaveCardModel");

async function getCardSaveByUserId(req, res) {
    const { iduser } = req.params;
    try {
        const savecards = await SaveCardModel.find({ iduser: iduser }).populate("idcard");

        if (!savecards) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thiệp đã lưu",
            });
        }

        return res.status(200).json({
            success: true,
            data: savecards,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = getCardSaveByUserId;
