const express = require('express');

const postsController = require('../controllers/postsController');

const router = express.Router();


router.post('/', verifyToken ,experiencesController.createReport);


router.put('/:postId', postsController.updateReport);

// @route GET api/experiences/search/:reportId
// @desc Get experiences
// @access Public
router.get('/search/:reportId', verifyToken , experiencesController.getReport);


router.delete('/', verifyToken.verifyTokenAndAdmin, experiencesController.deleteExperience);


module.exports = router;
