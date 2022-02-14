const router = require('express').Router();

const authController = require('../controllers/authController');


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('../middlewares/authTest');


// api/auth/login

router.post('/login', authController.login);

router.post('/registerTest', authController.testRegister);

router.post('/register', authController.register);

router.post('/activation',verifytoken, authController.activateEmail);

router.post('/verify-phone', authController.activatePhone);

router.post('/refresh-token', authController.getAccessToken);

router.post('/forgot-password', authController.forgotPassword);

router.put('/reset-password', authController.resetPassword);

router.delete('/logout', authController.logout);


router.post('/google-login', authController.googleLogin);
router.post('/facebook-login', authController.facebookLogin);

// // @route GET api/auth/:userId
// // @desc Get current user
// // @access Private
// router.get('/:userId', verifyToken, authController.getCurrentUser);

module.exports = router;
