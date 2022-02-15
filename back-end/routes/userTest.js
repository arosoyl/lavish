const router = require('express').Router();

const {auth, 
    authorization, 
    authAdmin
} = require('../middlewares/auth');

const userController = require('../controllers/userController');


router.get('/:userId', userController.getUserInfor);

router.get('/all-user', authAdmin ,userController.getAllUsers);

router.put('/update/:userId',  userController.updateUser); 


// // router.put('/:userId', verifyToken ,userController.updateUser);
// router.put('/update/:userId', verifyToken, userController.updateUser);


// done

router.patch('/:userId', authAdmin, userController.banUser);

router.delete('/:userId', authAdmin, userController.deleteUser);





// router.get('/search/:userId', verifyToken , userController.searchUser);


// router.get('/',authMiddleware.verifyToken, userController.getAllUsers);

module.exports = router;
