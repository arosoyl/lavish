// const argon2 = require('argon2');
// const { default: Nexmo } = require('nexmo');
// // const jwt = require('jsonwebtoken');

// // const User = require('../models/User');

// // const {
// //     ACCESS_TOKEN_LIFE,
// //     ACCESS_TOKEN_SECRET
// //   } = require('../configs/index');

// // const authController = {};

// // authController.getCurrentUser = async (req,res) => {

// //     try {
// //         const user = await User.findById(req.userId).select('-password');
    
// //         if (!user) {
// //           return res
// //             .status(400)
// //             .json({ success: false, message: 'User not found' });
// //         }
    
// //         res.json({ success: true, user });
// //       } catch (error) {
// //         console.log('error', error);
// //         res.status(500).json({ success: false, message: 'Internal server error' });
// //       }
// // };

// // authController.register = async (req,res) => {

// //     // const {username, password,... } = req.body;

// //     if (!username || !password) {
// //         return res
// //           .status(400)
// //           .json({
// //               success: false,
// //               message: 'Missing username or password'
// //           });
// //     } 

// //     try {

// //         const existingUser = await User.findOne({username});
        
// //         if ( existingUser){
// //             return res
// //               .status(400)
// //               .json({
// //                   success: false, 
// //                   message: 'Username is already taken'
// //               });
// //         }
    
// //         const hashedPassword = await argon2.hash(password);
// //         const user = new User({
// //             username,
// //             password: hashedPassword,
// //             // ...
// //         })
    
// //         await user.save();
    
// //         const accessToken = jwt.sign({userId: user._id}, ACCESS_TOKEN_SECRET, {
// //             expiresIn: ACCESS_TOKEN_LIFE
// //         });
    
// //         return res.json({
// //             success: true, 
// //             message: 'User has been created successfully',
// //             username,
// //             accessToken,
// //         });

// //     }
// //     catch(error){
// //         console.log('error', error);
// //         res.status(500).json({
// //             success: false, 
// //             message: 'Internal server error'
// //         });
// //     }
// // };

// // authController.login = async (req, res) => {

// //     const { username, password} = req.body;

// //     if( !username || !password) {
// //         return res 
// //            .status(400)
// //            .json({
// //                success: false, 
// //                message: 'Missing username or password'
// //            });
// //     }

// //     try {
// //         const user = await User.findOne({username});

// //         // User does not exist 
// //         if (!user) {
// //             return res
// //                .status(400)
// //                .json({
// //                    success: false,
// //                    message: 'Incorrect username or password'
// //                });
// //         }

// //         const isPasswordCorrect = await argon2.verify(user.password, password);

// //         if ( !isPasswordCorrect) {
// //             return res  
// //                .status(400)
// //                .json({
// //                    success: false,
// //                    message: 'Incorrect username or password'
// //                });
// //         }

// //         return res.json({
// //             success: true,
// //             message: 'User has successfully logged in',
// //             username,
// //             accessToken,
// //         });
// //     }
// //     catch(error){
// //         console.log('error' ,error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Internal server error'
// //         });
// //     };
// // };




// const authController = {

//     // Register user
//     registerUser: async(req, res) => {

//     try {
//         const hashedPassword = await argon2.hash(req.body.password);

//         // Create new user
//         const newUser = await new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPassword,
//             role: req.body.role,
//         });

//         //Save to db
//         const user = await newUser.save();
//         res.status(200).json("Sucess");
        
        

//     }
//     catch(err){
//         res.status(500).json(err);
//     }
    
// }
//     // // Check user SMS
//     // checkUser: async (req,res) => {
//     //     const number = req.body.number;

        
//     // }


// }


// module.exports = authController;