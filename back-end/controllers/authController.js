const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


const User = require("../models/User");

const sendMail = require('./sendMail');
const { sendSMS, verifySMS, cancelSMS } = require('./sendSMS');


const authController = {

    // Register user
    register: async (req, res) => {

        try {
            const { username, email, password, role, 
                // fullname, phone, address 
            } = req.body

            if (!username || !email || !password || !role 
                // || !fullname || !phone || !address
                )
                return res
                    .status(400)
                    .json({ msg: "Please fill in all fields." })


            if (!validateEmail(email))
                return res
                    .status(400)
                    .json({ msg: "Invalid emails." })


            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Username is already taken'
                    });
            }
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Email is already taken'
                    });
            }

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters." })

            const hashedPassword = await argon2.hash(req.body.password);

            const newUser = {
                username,
                email,
                password: hashedPassword,
                role,
                // phone,
                // address,
                // fullname
            }

            const activation_token = createActivationToken(newUser)

            console.log(activation_token)
            const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Xác thực tài khoản của bạn")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    activateEmail: async (req, res) => {

        try {

            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            console.log(user);
            const { username, email, role, password, phone, fullname, avatar, address } = user;

            // console.log({username,email,role,password});

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

            // User does not exist 
            if (!user) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Username does not exist'
                    });
            }

            // if (user.role == 'Org') {
            //     if (!user.isAuth)
            //         return res
            //             .status(400)
            //             .json({
            //                 success: false,
            //                 message: 'Account does not authentication!'
            //             });
            // }

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
                message: error.massage
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