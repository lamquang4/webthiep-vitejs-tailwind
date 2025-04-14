const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
    namecate: {
        type: String,
        required: [true, "Tên danh mục cha không để trống"]
    },
    status: {
        type: Number,
        required: true,
        enum: [0, 1]
    }
}, {
    timestamps: true
});

const CategoryModel = mongoose.model('Category', cateSchema);

module.exports = CategoryModel;
