const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isAuth: {
        type: Boolean,
        default: false,
    },
    legalRepresentative: {
        type: String,
        required: true,
    },
    // bank: {
    //     type: String,
    //     required: true,
    // },
    // donate: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Donate'
    //     }
    // ],
    // fund: {
    //     type: Number,
    //     default: 0,
    // }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Org', OrgSchema);
