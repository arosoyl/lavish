const mongoose = require('mongoose');

const OrgConditionSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    name: {
        type: String,
        required: true,
    },
    p: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

module.export = mongoose.model('OrgCondition', OrgConditionSchema);