const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
    content : {
        type: String,
        required: [true, "Nội dung không để trống"],
    },
    image : {
        type : String,
        required: [true, "Hình chính không để trống"],
    },
    image1 : {
        type : String
    },
    namecard : {
        type : String,
        required: [true, "Tên thiệp không để trống"],
    },
          subcategories: [
               {
                   type: mongoose.Schema.Types.ObjectId, 
                   ref: 'SubCategory',
                   required: [true, "Danh mục con không để trống"]
               }
           ],
         status:  {
type : Number,
required: true,
enum: [0, 1]
           }
},{
    timestamps: true
})

    const CardModel = mongoose.model('Card', cardSchema)
    
    module.exports = {
        CardModel
    }