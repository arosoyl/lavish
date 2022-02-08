require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const uploadRoute = require('./routes/uploadRoute');



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
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/post', postRoute);


//Init Nexmo
// const Vonage = require('@vonage/server-sdk')

// const vonage = new Vonage({
//     apiKey: "38b7b07a",
//     apiSecret: "ecOQ0VLVa14WScDE"
// })


// app.post('/verify', (req, res) => {
    
//     const number = req.body.number;

//     // Make a verification request
//     vonage.verify.request({
//         number: number,
//         brand: "Sunflower"
//       }, (err, result) => {
//         if (err) {
//           console.error(err);
//         } else {
//           const verifyRequestId = result.request_id;
//           console.log('request_id', verifyRequestId);
//         }
//       });

//       // Check the request with a code
//       vonage.verify.check({
//         request_id: REQUEST_ID,
//         code: CODE
//       }, (err, result) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(result);
//         }
//       });

//       // Cancel The Request
//       vonage.verify.control({
//         request_id: REQUEST_ID,
//         cmd: 'cancel'
//       }, (err, result) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(result);
//         }
//       });
   
// })

