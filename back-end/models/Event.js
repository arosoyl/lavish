const mongoose = require('mongoose');

const Timelines = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }

})

const OrgConditions = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parameter: {
        type: String,
        required: true,
    }

})

const EventSchema = new mongoose.Schema({

    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Org', // User - Role 1 ORG
    },
    nameEvent: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['On-going', 'Completed', 'Cancel'],
        default: "On-going",
    },
    description: {
        type: String,
        required: true,
    },
    timelines: [
        Timelines
    ],
    orgConditions: [

        OrgConditions

    ],
    reportId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Report',
        },
    ],
    donates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Donate',
        },
    ],
    member: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    ]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Event', EventSchema);