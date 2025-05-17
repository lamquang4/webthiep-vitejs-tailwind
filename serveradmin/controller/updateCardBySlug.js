const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { CardModel } = require("../models/CardModel");
const removeVietNamese = require("../utils");
const uploadPath = path.join(__dirname, "../../public/uploads/thiep");

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    const namecard = req.body.namecard;
    const slug = removeVietNamese(namecard);
    const ext = path.extname(file.originalname);

    if (file.fieldname === "mainImage") {
      cb(null, `${slug}${ext}`);
    } else if (file.fieldname === "subImage") {
      cb(null, `${slug}-empty${ext}`);
    }
  },
});

const upload = multer({ storage });

async function updateCardBySlug(req, res) {
  const { slug } = req.params;
  const { namecard, content, subcategoryId, image, image1 } = req.body;

  try {
    const checkNamecard = await CardModel.findOne({
      namecard,
      slug: { $ne: slug },
    });
    if (checkNamecard) {
      return res
        .status(400)
        .json({ success: false, message: "Tên thiệp đã tồn tại" });
    }

    const card = await CardModel.findOne({ slug: slug });
    if (!card) {
      return res
        .status(404)
        .json({ success: false, message: "Thiệp không tồn tại" });
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

    const newSlug = removeVietNamese(namecard);

    card.namecard = namecard || card.namecard;
    card.slug = newSlug || card.slug;
    card.content = content || card.content;
    card.image = mainImage;
    card.image1 = subImage;
    card.subcategories = subcategoryId || card.subcategories;

    await card.save();

    return res
      .status(200)
      .json({ success: true, message: "Cập nhật thành công", data: card });
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
  updateCardBySlug,
  upload: [
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "subImage", maxCount: 1 },
    ]),
  ],
};
