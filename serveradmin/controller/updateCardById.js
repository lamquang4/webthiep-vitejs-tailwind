const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { CardModel } = require("../models/CardModel");

const uploadPath = path.join(__dirname, '../../public/uploads/thiep');

const storage = multer.diskStorage({
  destination: uploadPath,  
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now();

    if (file.fieldname === 'mainImage') {
      cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    } else if (file.fieldname === 'subImage') {
      cb(null, `${baseName}-empty-${uniqueSuffix}${ext}`);
    }
  },
});

const upload = multer({ storage });

async function updateCardById(req, res) {
  const { id } = req.params;
  const { namecard, content, subcategoryId, image, image1 } = req.body;

  try {
    const checkNamecard = await CardModel.findOne({ namecard, _id: { $ne: id } });
    if (checkNamecard) {
      return res.status(400).json({ success: false, message: "Tên thiệp đã tồn tại" });
    }

    const card = await CardModel.findById(id);
    if (!card) {
      return res.status(404).json({ success: false, message: "Thiệp không tồn tại" });
    }

    let mainImage = card.image;
    let subImage = card.image1;

    if (req.files?.mainImage) {
      mainImage = req.files.mainImage[0].filename;
      deleteImage(card.image); // Xóa ảnh cũ
    }

    if (req.files?.subImage) {
      subImage = req.files.subImage[0].filename;
      deleteImage(card.image1); // Xóa ảnh cũ
    }

    card.namecard = namecard || card.namecard;
    card.content = content || card.content;
    card.image = mainImage;
    card.image1 = subImage;
    card.subcategories = subcategoryId || card.subcategories;

    await card.save();

    return res.status(200).json({ success: true, message: "Cập nhật thành công", data: card });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

function deleteImage(filename) {
  if (!filename) return;
  const imagePath = path.join(uploadPath, filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
}

module.exports = {
  updateCardById,
  upload: [upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImage', maxCount: 1 }])],
};
