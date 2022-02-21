const router = require('express').Router();

const {
    auth,
    authorization,
    authAdmin
} = require('../middlewares/auth');

const userController = require('../controllers/userController');







router.get('/:userId/search/:id', userController.search) // :>> ???



// // router.put('/:userId', verifyToken ,userController.updateUser);
// router.put('/update/:userId', verifyToken, userController.updateUser);


// done
router.put('/checkAuth/:userId', authAdmin, userController.updateAuthOrg);

router.get('/all-user',auth, userController.getAllUser);

router.get('/:userId', authorization,userController.getUserInfor);

router.put('/update/:userId', authorization, userController.updateUser);

router.patch('/:userId', authAdmin, userController.banUser);

router.delete('/:userId', authAdmin, userController.deleteUser);





// router.get('/search/:userId', verifyToken , userController.searchUser);


// router.get('/',authMiddleware.verifyToken, userController.getAllUsers);

module.exports = router;
