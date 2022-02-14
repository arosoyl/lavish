const express = require('express');

const eventsController = require('../controllers/eventsController');


const router = express.Router();

// @route GET api/events
// @desc Get all events
// @access Public
router.get('/list-event', eventsController.getAllEvent);

// @route GET api/events/search/:eventId
// @desc Get event
// @access Public
router.get('/search/:eventId', eventsController.searchEvent);

// @route POST api/events
// @desc Create new events
// @access Private
router.post('/new', eventsController.createEvent);

// @route POST api/events/:eventId
// @desc Update events
// @access Private
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