const mongoose = require('mongoose');

const DonateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
 
    amount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.export = mongoose.model('Donate', DonateSchema);