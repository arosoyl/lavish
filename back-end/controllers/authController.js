// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');

// const User = require('../models/User');

// const {
//     ACCESS_TOKEN_LIFE,
//     ACCESS_TOKEN_SECRET
//   } = require('../configs/index');

// const authController = {};

// authController.getCurrentUser = async (req,res) => {

//     try {
//         const user = await User.findById(req.userId).select('-password');
    
//         if (!user) {
//           return res
//             .status(400)
//             .json({ success: false, message: 'User not found' });
//         }
    
//         res.json({ success: true, user });
//       } catch (error) {
//         console.log('error', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//       }
// };

// authController.register = async (req,res) => {

//     // const {username, password,... } = req.body;

//     if (!username || !password) {
//         return res
//           .status(400)
//           .json({
//               success: false,
//               message: 'Missing username or password'
//           });
//     } 

//     try {

//         const existingUser = await User.findOne({username});
        
//         if ( existingUser){
//             return res
//               .status(400)
//               .json({
//                   success: false, 
//                   message: 'Username is already taken'
//               });
//         }
    
//         const hashedPassword = await argon2.hash(password);
//         const user = new User({
//             username,
//             password: hashedPassword,
//             // ...
//         })
    
//         await user.save();
    
//         const accessToken = jwt.sign({userId: user._id}, ACCESS_TOKEN_SECRET, {
//             expiresIn: ACCESS_TOKEN_LIFE
//         });
    
//         return res.json({
//             success: true, 
//             message: 'User has been created successfully',
//             username,
//             accessToken,
//         });

//     }
//     catch(error){
//         console.log('error', error);
//         res.status(500).json({
//             success: false, 
//             message: 'Internal server error'
//         });
//     }
// };

// authController.login = async (req, res) => {

//     const { username, password} = req.body;

//     if( !username || !password) {
//         return res 
//            .status(400)
//            .json({
//                success: false, 
//                message: 'Missing username or password'
//            });
//     }

//     try {
//         const user = await User.findOne({username});

//         // User does not exist 
//         if (!user) {
//             return res
//                .status(400)
//                .json({
//                    success: false,
//                    message: 'Incorrect username or password'
//                });
//         }

//         const isPasswordCorrect = await argon2.verify(user.password, password);

//         if ( !isPasswordCorrect) {
//             return res  
//                .status(400)
//                .json({
//                    success: false,
//                    message: 'Incorrect username or password'
//                });
//         }

//         return res.json({
//             success: true,
//             message: 'User has successfully logged in',
//             username,
//             accessToken,
//         });
//     }
//     catch(error){
//         console.log('error' ,error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//     };
// };




// // //router.post('/register', async(req,res)=>{ const user = new User({ name:req.body.name, email:req.body.email, password: req.body.password }); try{ const savedUser = await user.save(); res.send(savedUser); } catch(err){ res.status(400).send(err); console.log(err); } });
// // exports.register = async (req, res, next) => {
// //     try {
// //         //     // //req.body - name ...

// //         //    const user = new User({  email:req.body.email, password: req.body.password });
// //         //    const savedUser = await user.save(); res.send(savedUser);

// //         const user = await User.create(req.body);
// //         res.status(200).json({
// //             status: 'success',
// //             // data: { user}
// //         });
// //     } catch (error) {
// //         res.status(401).json(error);
// //     }
// // };

// // exports.login = (req, res, next) => {
// //     // res.json('User login');
// //     try {
// //         const { username, password } = req.body;
// //         res.status(200).send({ message: 'Hey' });
// //     } catch (error) {
// //         res.status(401).json(error);
// //     }
// // };

// module.exports = authController;

const Volunteer = require("../models/Volunteer");
const bcrypt = require("bcrypt")
const authController = {
    register: async(req,res) => {
        try {

            const 

        }
        catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = authController;