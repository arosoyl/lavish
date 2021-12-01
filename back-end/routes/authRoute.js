const express = require('express');
const { login } = require('../controllers/authController');
const { register } = require('../controllers/authController');

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);

module.exports = Router;
