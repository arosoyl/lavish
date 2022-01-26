const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:""
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
    // ,
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }

}, {
    timestamps: true
});

module.exports = mongoose.model('User',UserSchema);