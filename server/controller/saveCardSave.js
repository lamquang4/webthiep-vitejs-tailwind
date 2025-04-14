const SaveCardModel = require("../models/SaveCardModel");

async function saveCardSave(req, res) {
    try {
        const { contentedit, fontfamily, fontstyle, fontweight, color, idcard, iduser } = req.body;

        const existingCard = await SaveCardModel.findOne({ idcard, iduser });

        if (existingCard) {
            existingCard.contentedit = contentedit || existingCard.contentedit;
            existingCard.fontfamily = fontfamily || existingCard.fontfamily;
            existingCard.fontstyle = fontstyle || existingCard.fontstyle;
            existingCard.fontweight = fontweight || existingCard.fontweight;
            existingCard.color = color || existingCard.color;
       
            await existingCard.save();

            return res.status(200).json({
                success: true,
                message: "Cập nhật thành công",
                data: existingCard
            });
        } else {

            const newCard = new SaveCardModel({
                contentedit,
                fontfamily,
                fontweight,
                fontstyle,
                color,
                idcard,
                iduser
            });

            const savedCard = await newCard.save();

            return res.status(201).json({
                success: true,
                message: "Lưu mới thành công",
                data: savedCard
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Lỗi server",
            error: true
        });
    }
}

module.exports = saveCardSave;
