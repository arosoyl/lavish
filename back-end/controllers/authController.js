const User = require('../models/User');

//router.post('/register', async(req,res)=>{ const user = new User({ name:req.body.name, email:req.body.email, password: req.body.password }); try{ const savedUser = await user.save(); res.send(savedUser); } catch(err){ res.status(400).send(err); console.log(err); } });
exports.register = async (req, res, next) => {
    try {
        //     // //req.body - name ...

        //    const user = new User({  email:req.body.email, password: req.body.password });
        //    const savedUser = await user.save(); res.send(savedUser);

        const user = await User.create(req.body);
        res.status(200).json({
            status: 'success',
            // data: { user}
        });
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.login = (req, res, next) => {
    // res.json('User login');
    try {
        const { username, password } = req.body;
        res.status(200).send({ message: 'Hey' });
    } catch (error) {
        res.status(401).json(error);
    }
};
