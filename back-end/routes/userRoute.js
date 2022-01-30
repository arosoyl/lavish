const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
// const verifyToken = require('../middlewares/authMiddleware');

// const {
//     verifyToken,
//     verifyTokenAndAdmin,
//     verifyTokenAndUserAuthorization,
//   } = require("../controllers/verifyToken");



// @route PUT api/user/:userId
// @desc Update user
// @access Private
// router.put('/:userId', verifyToken ,userController.updateUser);

// @route DELETE api/user/:userId
// @desc Delete user
// @access Private
// router.delete('/:userId', verifyTokenAndAdmin ,userController.deleteUser);
router.delete('/:userId', userController.deleteUser);

// @route GET api/user/search/:userId
// @desc Get user
// // @access Public
// router.get('/search/:userId', verifyToken , userController.searchUser);

// @route GET api/user
// @desc Get all users
// @access Private
router.get('/',authMiddleware.verifyToken, userController.getAllUsers);

module.exports = router;
