const express = require('express');

const experiencesController = require('../controllers/reportsController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// @route POST api/experiences
// @desc Create experiences
// @access Private
router.post('/', verifyToken ,experiencesController.createReport);

// @route PUT api/experiences/:reportId
// @desc Update experiences
// @access Private
router.put('/:reportId',verifyToken,experiencesController.updateReport);

// @route GET api/experiences/search/:reportId
// @desc Get experiences
// @access Public
router.get('/search/:reportId', verifyToken , experiencesController.getReport);

// @route GET api/experiences
// @desc GET all experiences
// @access Private
router.get('/', reportsController.getAllReport);

// @route DELETE api/experiences
// @desc Delete experiences
// @access Private
router.delete('/', verifyToken.verifyTokenAndAdmin, experiencesController.deleteExperience);

module.exports = router;
