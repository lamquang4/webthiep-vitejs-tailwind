const path = require('path');
const multer = require('multer');
const { CardModel } = require('../models/CardModel');
const fs = require('fs');
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


const addCard = async (req, res) => {
  try {
    const { namecard, content, subcategoryId } = req.body;

    const mainImagePath = req.files.mainImage[0].filename;
    const subImagePath = req.files.subImage && req.files.subImage.length > 0 ? req.files.subImage[0].filename : null;

    const newCard = new CardModel({
      namecard,
      content,
      image: mainImagePath,
      image1: subImagePath || null,
      subcategories: subcategoryId,
      status: 0
    });

    await newCard.save();

    res.status(201).json({ success: true, message: 'Thêm thiệp thành công', data: newCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

module.exports = {
  addCard,
  upload: upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImage', maxCount: 1 }]),
};