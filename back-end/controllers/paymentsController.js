const User = require("../models/User");
const Donate = require("../models/Donate");

const paymentsController = {

    getDonateForUser: async (req, res) => {

        try {
            const donates = await Donate.findById(req.user.id);
            res.json(donates)

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    createPayment: async (req, res) => {

        try {
            const user = await User.findById(req.user.id).select('-password');

            console.log(user);

            if (!user)
                return res
                    .status(400)
                    .json({ message: "User does not exist" })

            const { eventId, amount, paymentId, note } = req.body;

            const{_id, username, email} = user;



            const newDonate = new Donate({
                userId: user.id,
                eventId,
                amount,
                note
            })

            await newPayment.save()
            res.status(200).json({
                message: "Donate success!"
            })

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
};


module.exports = paymentsController;