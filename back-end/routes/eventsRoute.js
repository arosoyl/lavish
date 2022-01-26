const express = require('express');

const eventsController = require('../controllers/eventsController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// @route GET api/events
// @desc Get all events
// @access Public
router.get('/', eventsController.getAllEvents);

// @route GET api/events/search/:eventId
// @desc Get event
// @access Public
router.get('/search/:eventId', eventsController.getEvent);

// @route POST api/events
// @desc Create new events
// @access Private
router.post('/', verifyToken ,eventsController.createEvent);

// @route POST api/events/:eventId
// @desc Update events
// @access Private
router.put('/:eventId', verifyToken, eventsController.updateEvent);

// @route POST api/events/:eventId/register/:userId
// @desc Log out user
// @access Public
router.post('/:eventId/register/:userId', eventsController.registerEvent); // check statue

// @route GET api/events/:eventId/volunteers
// @desc Get volunteer in event
// @access Private
router.get('/:eventId/volunteers', eventsController.getVolunteersEvent);

// @route DELETE api/events/:eventId
// @desc Delete event
// @access Private
router.delete('/:eventId', verifyToken, eventsController.deleteEvent);


module.exports = router;