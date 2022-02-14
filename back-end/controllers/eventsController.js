const User = require('../models/User');
const Event = require('../models/Event');
const Report = require('../models/Report');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const sendMail = require('./sendMail');
const { sendSMS, verifySMS } = require('./sendSMS');


const eventsController = {


    createEvent: async (req, res) => {
        const event = req.body;
        console.log(event)

        const newEvent = new Event({

            _id: new mongoose.Types.ObjectId(),
            orgId: event.orgId,
            nameEvent: event.nameEvent,
            place: event.place,
            description: event.description,
            timelines: event.timelines,
            orgCondition: event.orgCondition,

        })

        await newEvent.save();
        console.log(newEvent)

        // try {

        //     const event = req.body;

        //     // const newEvent = new Event({

        //     //     _id: new Object,
        //     //     orgId: event.orgId,
        //     //     nameEvent: event.nameEvent,
        //     //     // place: event.place,
        //     //     // description: event.description,
        //     //     timelines: event.timelines,
        //     //     // orgCondition: event.orgCondition,
        //     //     // member: [],


        //     // })

        //     // await newEvent.save();

        //     console.log({event})

        //     // const newReportId = new Report({
        //     //     eventId: event._id,




        //     // })

        //     // await newReportId.save()

        //     // const newVolunteer = new Volunteer({
        //     //     userId: newUser._id,
        //     //     gender: user.gender,
        //     //     birthday: user.birthday,
        //     // })
        //     // await newVolunteer.save()


        //     // const newDonate = new Donate({

        //     // })

        //     // await newDonate.save()




        //     // var friend = { "firstName": req.body.fName, "lastName": req.body.lName };
        //     // Users.findOneAndUpdate({ name: req.user.name }, { $push: { friends: friend } });





        //     // timelines orgConditions donates

        // }
        // catch (error) {
        //     console.log('error', error);
        //     res.status(500).json({
        //         success: false,
        //         message: error.message
        //     });
        // };

    },


    getAllEvent: async (req, res) => {

        try {
            const events = await Event.find()
                .sort({ createdAt: '' })
                .populate({path: 'orgId', populate: {path: 'userId'}})
                .populate({path: 'reportId'})
                .populate('member',['username','avatar'])


            res.json({
                success: true,
                events
            });
        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        };
    },


    searchEvent: async (req, res) => {

        try {
            // _id: req.params.eventId,
            const event = await Event.find({_id: req.params.eventId})
                .sort({ createdAt: '' })
                .populate('orgId', ['userId']);

            if (!event) {
                return res.status(500).json({
                    success: false,
                    message: 'Event does not exist'
                });
            }
            return res.json({
                success: true,
                event
            });
        }
        catch (error) {
            console.log('error', error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        };

    },


    updateEvent: async (req, res) => {

        const event  = req.body;

        try {

            let updatedPost = {
                content,
                favoriteCount,
                title,
                photo
            };

            const updateCondition = { _id: req.params.eventId, user: req.userId };
            // console.log(req.userId);

            updatedEvent = await Post.findOneAndUpdate(updateCondition, updatedPost, {
                new: true,
            }); // ??? 

            if (!updatedPost) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user is not authorized',
                });
            }

            res.json({ success: true, message: 'Post is updated!', updatedPost });


        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        };




    },

    registerEvent: async (req, res) => {



    },

    deleteEvent: async (req, res) => {

        try {

            const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);

            if (!deletedEvent) {
                return res.status(401).json({
                    success: false,
                    message: 'Event not found',
                });
            }
            return res
                .status(200)
                .json({ success: true, message: 'Event is deleted!', deletedEvent });

        } catch (err) {
            return res
                .status(500)
                .json({ message: err.message })
        }

    },

};


module.exports = eventsController;