const router = require('express').Router();

const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

const {
    verifyToken,
    verifyTokenAndUserAuthorization,
    verifyTokenAndOrgAuthorization,
    verifyTokenAndAdmin,
} = require('../middlewares/authMiddleware');

// @route PUT api/user/:userId

router.get('/:userId', auth , userController.getUserInfor);

router.get('/all-user', auth, authAdmin ,userController.getAllUsers);

router.put('/update/:userId', auth, userController.updateUser); 

router.put('/update-role/:userId', auth, userController.updateUserRole); 

// // router.put('/:userId', verifyToken ,userController.updateUser);
// router.put('/update/:userId', verifyToken, userController.updateUser);

router.delete('/delete/:userId', auth, authAdmin, userController.deleteUser);





// router.get('/search/:userId', verifyToken , userController.searchUser);


// router.get('/',authMiddleware.verifyToken, userController.getAllUsers);

module.exports = router;
