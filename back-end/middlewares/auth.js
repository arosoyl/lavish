const jwt = require('jsonwebtoken')
const User = require('../models/User')


const auth = (req, res, next) => {
    try {
        // const token = req.header("Authorization")
        // if (!token) return res.status(400).json({ msg: "No token." })


        // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //     if (err) return res.status(400).json({ msg: "Invalid Authentication." })

        //     req.user = user


        //     // console.log(user)


        //     next()
        // })

        const authHeader = req.header.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Invalid Authentication." })
                req.user = user;
                next();
            })
        }
        else {
            return res.status(401).json("You are not authenticated! ")
        }

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
};

const authorization = (req, res, next) => {

    auth(req, res, () => {
        if (req.user.userId === req.params.id || req.user.role === 'Admin') {
            next();
        }
        else {
            return res.status(403).json("You are not allowed to do that! ")
        }
    });
};

const authAdmin = (req, res, next) => {

    auth(req, res, () => {
        if (req.user.role === 'Admin') {
            next();
        }
        else {
            return res.status(403).json("Admin resources access denied.")
        }
    });
};


module.exports = { auth, authorization, authAdmin }