const mongoose = require('mongoose');

const accSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên đăng nhập không để trống"]
    },
    email: {
        type: String,
        required: [true, "Email không để trống"],
        unique: true
    },
    password: {
        type: String
    },
    type: {
        type: String,
        required: [true]
    },
    status: {
        type: Number,
        required: true,
        enum: [0, 1]
    }
}, {
    timestamps: true
});

const AccountModel = mongoose.model('Account', accSchema);

module.exports = AccountModel;
