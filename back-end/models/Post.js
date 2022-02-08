const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Volunteer',
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
        type: Number,
        default: 0,   
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

}, {
    timestamps: true,
});

model.export = mongoose.model('Post', PostSchema);


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
