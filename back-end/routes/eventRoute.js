const express = require('express');

const eventsController = require('../controllers/eventsController');

const router = express.Router();




router.post('/new', eventsController.createEvent);


router.get('/list-event', eventsController.getAllEvent);


router.get('/search/:eventId', eventsController.searchEvent);


router.put('/:eventId',  eventsController.updateEvent);

// @route POST api/events/:eventId/register/:userId
// @desc Log out user
// @access Public
router.post('/:eventId/register', eventsController.registerEvent); // check statue

// @route DELETE api/events/:eventId
// @desc Delete event
// @access Private
router.delete('/:eventId', eventsController.deleteEvent);


module.exports = router;