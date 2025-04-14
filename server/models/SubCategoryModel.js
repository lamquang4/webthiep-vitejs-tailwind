const mongoose = require('mongoose');

const subcateSchema = new mongoose.Schema({
    namesubcate: {
        type: String,
        required: [true, "Tên danh mục con không để trống"]
    },
    slug: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true
    },
       categories: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Category'
            }
        ]
}, {
    timestamps: true
});

const SubCategoryModel = mongoose.model('SubCategory', subcateSchema);

module.exports = SubCategoryModel;
