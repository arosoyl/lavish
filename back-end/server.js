require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


// const userRoute = require('./routes/userRoute');
const uploadRoute = require('./routes/uploadRoute');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');
const userTest = require('./routes/userTest');
const eventRoute = require('./routes/eventRoute');



const app = express();

const port = process.env.WEB_PORT;

// connect DB
const { connectDB } = require('./configs/database');
connectDB();


// Cors
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true
}))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Mount the route
app.use('/api/auth', authRoute);
app.use('/api/user', userTest);
app.use('/api/upload', uploadRoute);

app.use('/api/event', eventRoute);

app.use('/api/post', postRoute);