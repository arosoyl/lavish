const User = require("../models/User");

const jwt = require('jsonwebtoken');


// // userController.searchUser = async ( req,res) => {

// // userController.updatehUser = async ( req,res) => {

// // userController.deleteUser = async ( req,res) => {

const userController = {

    getUserInfor: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');

            res.json({ user });


        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
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
                message: 'Internal server error'
            });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            // await User.findByIdAndDelete(req.params.id);
            await User.findById(req.params.userId);
            res.status(200).json("User deleted");
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const {username, avatar} = req.body
            await User.findOneAndUpdate({_id: req.user.id},{
                username,avatar
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
            const {role} = req.body

            await User.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
};


module.exports = userController;