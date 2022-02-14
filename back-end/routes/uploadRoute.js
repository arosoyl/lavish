const router = require('express').Router();

const uploadImage = require('../middlewares/uploadImage');
const uploadController = require('../controllers/uploadController');


router.post('/upload_avatar', uploadImage, uploadController.uploadAvatar);

module.exports = router;


// const auth = require('../middleware/auth')

// router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

