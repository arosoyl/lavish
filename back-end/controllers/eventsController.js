// const User = require('../models/User');
// const Event = require('../models/Event');
// const Report = require('../models/Report');
// const Experience = require('../models/Experience');

// const eventsController = {};

// eventsController.getEvent = async (req, res) => {

//     try {
//         const events = await Event.find()
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

// eventsController.createEvent = async (req,res) => {

//     const { } = req.body;

//     if ( ) {
//         return res
//            .status(404)
//            .json({
//                success: false, 
//                message: ''
//            })
//     }

//     try {
//         const 
//     }
//     catch(error){
//         console.log('error',errror);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }

// };

// eventsController.updateEvent = async (req, res) => {
//     try {
//         const 
//     }
//     catch(error) {
//         console.log('error', error);

//     }
// };

// eventsController.deleteEvent = async (req, res) => {
//     try {
//         const 
//     }
//     catch(error) {
//         console.log('error', error);

//     }
// };

// eventsController.registerEvent = async (req, res) => {
//     try {
//         const 
//     }
//     catch(error) {
//         console.log('error', error);

//     }
// };

// module.exports = eventsController;