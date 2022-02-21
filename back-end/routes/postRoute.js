const express = require('express');
const router = express.Router();

// const auth = require('../middlewares/auth')
// const authAdmin = require('../middlewares/authAdmin')

const postsController = require('../controllers/postsController');


// test 
router.get('/list-blog', postsController.getListPost);

router.get('/', postsController.getListPostForUser);

router.get('/:postId', postsController.getPost);

router.put('/:postId', postsController.updatePost);





// tìm kiếm


//favorite


router.patch('/:postId/favorite', postsController.favoritePost);

// done
router.post('/new',  postsController.createPost);

router.delete('/:postId', postsController.deletePostForUser);
router.delete('/:postId',  postsController.deletePost);

router.put('/:postId', postsController.updatePost);

module.exports = router;
