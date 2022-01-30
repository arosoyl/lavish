const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require("../models/User");


const authController = {

    // Register user
    register: async (req, res) => {

        const { username, password, email, role } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Missing some informations'
                });
        }

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Username is already taken'
                    });
            }

            const hashedPassword = await argon2.hash(req.body.password);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
            });

            //Save user to DB
            const user = await newUser.save();
            res.status(200).json({user,message:"Register success! Please activate your email to start."});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    login: async (req, res) => {

        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Missing username or password'
                });
        }

        try {
            const user = await User.findOne({ username });

            // User does not exist 
            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Incorrect username'
                    });
            }

            const isPasswordCorrect = await argon2.verify(user.password, password);
            if ( !isPasswordCorrect) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Incorrect password'
                    });
            }
            if ( user && isPasswordCorrect){
                const accessToken = jwt.sign({
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                }
                )
                
                res.status(200).json({user,accessToken});
            }

            // return res.json({
            //                 success: true,
            //                 message: 'User has successfully logged in',
            //                 user,
                
            //             });
        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        };
    },
    logout: async (req, res) => {

        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Missing username or password'
                });
        }
    }
};


module.exports = authController;