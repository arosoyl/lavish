const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);



// const mongoose = require('mongoose');

// const OrganizationSchema = new mongoose.Schema({
//     organizationId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User',
//     },
// }, {
//     timestamps: true,
// });

// model.export = mongoose.model('Organization', Organizationchema);


// const mongoose = require('mongoose');

// const EventSchema = new mongoose.Schema({

//     organizationId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'Organization',
//     },
//     nameEvent: {
//         type: String,
//         required: true,
//     },
//     place: {
//         type: String,
//         required: true,
//     },
//     state:{
//         type: String,
//         enum:['On-going','Completed','Cancel']
//     },
//     description: {
//         type: String,
//         required: true,

//     },
//     timeline:{
//         start_time: {

//         },
//         end_time: {

//         },
//     },
//     reportId:[
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref:'Report',
//         },
//     ],
//     orgConditions: [
//         {
//            name: {
//                type: String,
//                 required: true,
//            },
//            parameter:{
//                type: Number,
//                required: true
//            },

//         },
//     ],
// }, {
//     timestamps: true,
// });

// model.export = mongoose.model('Event', EventSchema);


// const mongoose = required('mongoose');

// const ParticipationSchema = new mongoose.Schema({

//     volunteerId:{
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'Volunteer',
//     },
//     eventId:{
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'Event',
//     },
//     certificate:{

//     },

// },{
//     timestamps: true,
// })

// model.export = mongoose.model('Participation', PartiipationSchema);



// ----> cerrtificate + timeline