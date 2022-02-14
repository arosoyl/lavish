const User = require("../models/User");

const jwt = require('jsonwebtoken');


const userController = {

    getUserInfor: async (req, res) => {

        try {
            const user = await User.findById(req.params.userId).select('-password');
            // const user = await User.findById({
            //     _id: req.user
            // })
            console.log(user);

            // console.log({user,mssg:"rrr"})

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {

        try {
            const user = await User.find().select('-password');
            res.status(200).json(user);
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { fullname, address, phone, avatar } = req.body
            await User.findOneAndUpdate({ _id: req.params.usedId }, {
                fullname,
                address,
                phone,
                avatar
            })
            res.status(200).json("Update success");

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // cho Org
    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body

            await User.findOneAndUpdate({ _id: req.params.userId }, {
                role
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Delete a user
    deleteUser: async (req, res) => {
        try {
            // await User.findByIdAndDelete(req.params.id);
            await User.findByIdAndUpdate(req.params.userId, {
                isActive: false,
            }, { new: true });
            res.status(200).json("User deleted");
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