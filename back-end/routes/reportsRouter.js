const express = require('express');

const reportsController = require('../controllers/reportsController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// @route POST api/reports
// @desc Create report
// @access Private
router.post('/', verifyToken ,reportsController.createReport);

// @route PUT api/reports/:reportId
// @desc Update report
// @access Private
router.put('/:reportId',verifyToken,reportsController.updateReport);

// @route GET api/reports/search/:reportId
// @desc Get report
// @access Public
router.get('/search/:reportId', verifyToken , reportsController.getReport);

// @route GET api/reports
// @desc GET all report
// @access Private
router.get('/', verifyToken.verifyTokenAndAdmin, reportsController.getAllReport);

// @route DELETE api/reports
// @desc Delete report
// @access Private
router.delete('/', verifyToken.verifyTokenAndAdmin, reportsController.deleteReport);

module.exports = router;
