const express = require('express');

const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// @route PUT api/user/:userId
// @desc Update user
// @access Private
router.put('/:userId', verifyToken ,userController.updateUser);

// @route DELETE api/user/:userId
// @desc Delete user
// @access Private
router.delete('/:userId', verifyTokenAndAdmin ,userController.deleteUser);

// @route GET api/user/search/:userId
// @desc Get user
// @access Public
router.get('/search/:userId', verifyToken , userController.searchUser);

// @route GET api/user
// @desc Get all user
// @access Private
router.get('/', verifyTokenAndAdmin, userController.getAllUser);

module.exports = router;
