const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Org = require("../models/Org");

const jwt = require('jsonwebtoken');


const userController = {


    


    search: async (req, res) => {

        try {

            const user = await User.findById({ _id: req.params.id }).select('-password')

            return res.status(200).json({
                user
            });
            // const a = req.params.id;
            // console.log(user);

            // if (user) {

            //     if (user.role == 'Volunteer') {
            //         const volunteer = await Volunteer.find({ userId: req.params.id })
            //             .populate('userId').exec();
            //         return res.status(200).json({
            //             volunteer
            //         });
            //     }
            //     console.log('YEah');

            //     if (user.role == 'Org') {
            //         const org = await Org.findOne({ userId: req.params.userId })
    
            //         return res.status(200).json({
            //             org
            //         });
            //     }
            // }
            // else {
            //     return res.status(404).json({
            //         message: 'User not found'
            //     });
            // }
        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    //

    // get a user info
    getUserInfor: async (req, res) => {

        try {

            const user = await User.findById({ _id: req.params.userId }).select('-password');

            if (user.role == 'Volunteer') {
                const volunteer = await Volunteer.findOne({ userId: req.params.userId })
                    .populate('userId');
                return res.status(200).json({
                    volunteer
                });
            }

            if (user.role == 'Org') {
                const org = await Org.findOne({ userId: req.params.userId })
                    .populate('userId');
                return res.status(200).json({
                    org
                });
            }

        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Get all users
    getAllUser: async (req, res) => {

        try {
            const user = await User.find().select('-password');

            if (user.role == 'Volunteer') {
                const volunteer = await Volunteer.findOne({ userId: req.params.userId })
                    .populate('userId');
                return res.status(200).json({
                    volunteer
                });
            }

            if (user.role == 'Org') {
                const org = await Org.findOne({ userId: req.params.userId })
                    .populate('userId');
                return res.status(200).json({
                    org
                });
            }
            // return res.status(200).json(user);

            // const user = await User.find().select('-password');
            // console.log(user);
            // res.status(200).json(user);
        } catch (error) {
            console.log('error', error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateUser: async (req, res) => {
        try {

            const user = await User.findOne(req.params.usedId);

            if (user.role == 'Volunteer') {
                const newVolunteer = req.body;

                await Volunteer.findOneAndUpdate({ userId: user._id }, {
                    gender: newVolunteer.gender,
                    birthday: newVolunteer.birthday,
                });
            }

            if (user.role == 'Org') {
                const newOrg = req.body;

                await Org.findByIdAndUpdate({ userId: user._id }, {
                    legalRepresentative: newOrg.legalRepresentative,
                    bank: newOrg.bank,
                    donate: newOrg.donate,
                    fund: newOrg.fund,
                })
            }


            const newUser = req.body;

            await User.findByIdAndUpdate(req.params.userId, {
                fullname: newUser.fullname,
                address: newUser.address,
                phone: newUser.phone,
                avatar: newUser.avatar
            }, { new: true });

            return res.status(200).json("Update success");

        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // cho Admin
    updateAuthOrg: async (req, res) => {
        try {
            const { role } = req.body

            await Org.findOneAndUpdate({ _id: req.params.userId }, {
                isAuth: true,
            }, { new: true });

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Ban a user
    banUser: async (req, res) => {
        try {
            // await User.findByIdAndDelete(req.params.id);
            await User.findByIdAndUpdate(req.params.userId, {
                isActive: false,
            }, { new: true });
            res.status(200).json("User was ban");
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.userId);
            // const volun = await Volunteer.find
            
            res.status(200).json("User was deleted");
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
};

module.exports = userController;