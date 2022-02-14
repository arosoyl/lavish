const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

const postsController = require('../controllers/postsController');



router.get('/:postId', auth, postsController.getPost);

router.get('/', postsController.getListPostForUser);

router.get('/list-post', auth, authAdmin, postsController.getListPost);

router.post('/new', auth, postsController.createPost);

router.put('/:postId', auth, postsController.updatePost);

router.delete('/:postId', auth, postsController.deletePostForUser);

router.delete('/:postId', auth, authAdmin, postsController.deletePost);



//favorite


router.patch('/:postId/favorite', postsController.favoritePost);




module.exports = router;
