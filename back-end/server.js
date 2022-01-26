const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute.js');

require('dotenv').config();

const app = express();

const port = process.env.WEB_PORT;

// connect DB
const { connectDB } = require('./configs/database');
connectDB();

// Mount the route
app.use('/api/auth', authRoute);

// Cors
app.use(cors());

// Body parser
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
