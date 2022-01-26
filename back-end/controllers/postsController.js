// const User = require('../models/User');
// const Event = require('../models/Event');
// const Report = require('../models/Report');
// const Experience = require('../models/Experience');

// const postsController = {};

// postsController.getEvent = async (req, res) => {

//     try {
//         const posts = await Event.find()
//             .sort({ createdAt: ''})
//             .populate('user', ['userId','fullname']);
//         res.json({
//             success: true,
//             events
//         });
//     }
//     catch (error){
//         console.log('error',error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//    };
// };

// module.exports = experiencesController;