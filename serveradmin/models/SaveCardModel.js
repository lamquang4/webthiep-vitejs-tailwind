const mongoose = require('mongoose')
 const saveCardSchema = new mongoose.Schema({  
        contentedit : {
            type : String,
            required: true,
            default : ""
        },
        fontfamily : {
            type : String,
            default : ""
        },
        fontweight : {
            type : String,
            default : "normal"
        },
        fontstyle : {
            type : String,
            default : "normal"
        },
       color : {
            type : String,
            default : ""
        },
           idcard : {
                type : mongoose.Schema.ObjectId,
                required: true,
                 ref : "Card"
            }
            ,
           iduser : {
                type : mongoose.Schema.ObjectId,
                required: true,
                 ref : "Account"
            }
        },{
            timestamps: true
        })

         const SaveCardModel = mongoose.model('SaveCard', saveCardSchema)
            
            module.exports = SaveCardModel;