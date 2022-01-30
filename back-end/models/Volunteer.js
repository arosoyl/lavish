const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

model.export = mongoose.model('Volunteer', VolunteerSchema);



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

// const ReportSchema = new mongoose.Schema({

//     organizationId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'Organization',
//     },
//     eventId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'Event',
//     },
//     total_cost: {
//         type: Number,
//         required: true,
//     },
//     expenses:[
//         {
//             activity: {
//                 type: String,
//                 required: true,
//             },
//             cost: {
//                 type: Number,
//                 required: true,
//             },
//         },
//     ],
// }, {
//     timestamps: true,
// });

// model.export = mongoose.model('Report', ReportSchema);




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


// const mongoose = require('mongoose');

// const ExperienceSchema = new mongoose.Schema({

//     volunteerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'Volunteer',
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     decription: {
//         type: String,
//         required: true,
//     },
//     content:{
//         type: String,
//         required: true,
//     },
//     total_favorite:{
//         type: Number,
//         default: 0,   
//     },

// }, {
//     timestamps: true,
// });

// model.export = mongoose.model('Experience', ExperienceSchema);

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