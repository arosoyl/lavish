const router = require('express').Router();


const paymentsController = require('../controllers/paymentsController');


router.get('/donate', paymentsController.getAllPayment);

router.post('/payment', paymentsController.createPayment);

module.exports = router;


// const auth = require('../middleware/auth')

// router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

