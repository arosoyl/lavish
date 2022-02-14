const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Org = require("../models/Org");

const sendMail = require('./sendMail');
const { sendSMS, verifySMS } = require('./sendSMS');


const authController = {

    testRegister: async (req, res) => {

        try {
            const { username, email, password, role, fullname, phone, address } = req.body

            if (!username || !email || !password || !role || !fullname || !phone || !address)
                return res
                    .status(400)
                    .json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res
                    .status(400)
                    .json({ msg: "Invalid emails." })

            const user = await User.findOne({ email })
            if (user)
                return res
                    .status(400)
                    .json({ msg: "This email already exists." })

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters." })

            const hashedPassword = await argon2.hash(req.body.password);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role,
                phone,
                address,
                fullname
            })

            await newUser.save()

            // const activation_token = createActivationToken(newUser)

            // const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
            // sendMail(email, url, "Xác thực tài khoản của bạn")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Register user
    register: async (req, res) => {

        const { username, password, email, role, phone, address, fullname } = req.body;

        if (!validateEmail(email)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Invalid email'
                });
        }

        if (!username || !password || !role || !phone || !address || !fullname || !email) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Missing some informations'
                });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Password must be at leasr 6 character'
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

            // const existingEmail = await User.findOne({ email });
            // if (existingEmail) {
            //     return res
            //         .status(400)
            //         .json({
            //             success: false,
            //             message: 'Email is already taken'
            //         });
            // }

            const hashedPassword = await argon2.hash(req.body.password);

            //Create new user
            const newUser = await new User({
                username,
                email,
                password: hashedPassword,
                role,
                phone,
                avatar,
                fullname,
                address
            });

            const activate_token = createActivationToken(newUser);
            // console.log({activate_token});

            // //send verification email to user
            const url = `${process.env.CLIENT_URL}/user/verify-email/${activate_token}`;
            console.log({ url });

            sendMail(email, url, "Xác nhận địa chỉ email của bạn");

            sendSMS(phone);

            res.status(200).json({ message: "Register success! Please activate your email to start." });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    activateEmail: async (req, res) => {

        try {

            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            // console.log({user});
            const { username, email, role, password, phone, fullname, avatar, address } = user;

            // console.log({username,email,role,password});
            const existingEmail = await User.findOne({ email });

            if (existingEmail) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Email is already taken'
                    });
            }

            const newUser = await new User({
                username,
                email,
                role,
                password,
                phone,
                fullname,
                avatar,
                address
            });

            await newUser.save()

            res.status(200).json({ message: "Account has been activated!" })

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        };

    },

    activatePhone: async (req, res) => {

        try {
            const { requestId, code } = req.body;
            verifySMS(requestId, code);
            cancelSMS(requestId);
            return res
                .status(200)
                .json({ message: 'Verify phone successfully' })


        }
        catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    login: async (req, res) => {

        try {

            const { username, password } = req.body;

            if (!username || !password) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Missing username or password'
                    });
            }

            const user = await User.findOne({ username });

            if (user.role == 'Org') {
                if (!user.isAuth)
                    return res
                        .status(400)
                        .json({
                            success: false,
                            message: 'Username does not authentication!'
                        });
            }

            console.log(user.role)

            // User does not exist 
            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Username does not exist'
                    });
            }

            const isPasswordCorrect = await argon2.verify(user.password, password);

            if (!isPasswordCorrect) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Incorrect password'
                    });
            }

            if (user && isPasswordCorrect) {

                const refreshToken = createRefreshToken({
                    userId: user._id,
                    role: user.role,
                })
                res.cookie('refreshtoken', refreshToken, {
                    httpOnly: true,
                    path: '/user/refresh-token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })
                res.status(200).json({ user, refreshToken, message: "Login success" });
            }

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        };
    },

    getAccessToken: (req, res) => {

        try {

            // const rf_token = req.cookies.refreshtoken
            // if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            // jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            //     if (err) return res.status(400).json({ msg: "Please login now!" })

            //     const access_token = createAccessToken({ id: user.id })
            //     res.json({ access_token })
            // })

            const { refresh_token } = req.body;


            console.log({ refresh_token });
            if (!refresh_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const accessToken = createAccessToken({ id: user.id, isActive: user.isActive, role: user.role })
                res.status(200).json({ accessToken });
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            if (!validateEmail(email)) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Invalid email'
                    });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Email does not exist'
                    });
            }
            // const accessToken = createAccessToken({ usedId: user._id })

            const accessToken = createAccessToken({ id: user.id })

            console.log({ accessToken })

            const url = `${process.env.CLIENT_URL}/user/reset-password/${accessToken}`

            sendMail(email, url, "Đặt lại mật khẩu của bạn")
            res.status(200).json({
                success: false,
                message: 'Re-send the password, please check your email.'
            });
        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;
            console.log(password);

            const hashedPassword = await argon2.hash(password);

            // console.log(req.user.payload.id);
            const user = await User.findOneAndUpdate({
                _id: req.user.id
            }, {
                password: hashedPassword
            })

            console.log(user)

            res.status(200).json({ message: "Password successfully changed." });

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh-token' })
            return res
                .status(200)
                .json({ message: "Logged out." })
        } catch (err) {
            return res
                .status(500)
                .json({ massage: err.message })
        }
    },

    googleLogin: async (req, res) => {


    },

    facebookLogin: async (req, res) => {

    },
};

const createActivationToken = (payload) => {
    return jwt.sign(
        payload
        ,
        process.env.ACTIVATION_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        }
    )
}

const createAccessToken = (payload) => {
    return jwt.sign(
        payload
        ,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        }
    )
}

const createRefreshToken = (payload) => {
    return jwt.sign(
        payload
        ,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        }
    )
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


module.exports = authController;