const mongoose = require('mongoose');

const ParticipationSchema = new mongoose.Schema({

    volunteerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Volunteer',
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Event',
    },
    certificate:{
        type: string,
    },

},{
    timestamps: true,
})

model.export = mongoose.model('Participation', ParticipationSchema);