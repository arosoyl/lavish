const User = require("../models/User");


// // userController.searchUser = async ( req,res) => {

// // userController.updatehUser = async ( req,res) => {

// // userController.deleteUser = async ( req,res) => {

const userController = {

    // Get all users
    getAllUsers: async (req, res) => {

        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            // await User.findByIdAndDelete(req.params.id);
            await User.findById(req.params.userId);
            res.status(200).json("User deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};


module.exports = userController;