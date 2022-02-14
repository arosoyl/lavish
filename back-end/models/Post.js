const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // User - role 0
    },
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    content:{
        type: String,
        required: true,
    },
    favoriteCount:{
        type: Number, //type: Array, default: [],
        default: 0,   
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDisplay: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", PostSchema);

