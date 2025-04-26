const { User } = require('../db/models/user');

const registerUser = async (req, res, next) => {
    const newUser = new User({
        userId: req.body.userId,
        userName: req.body.userName
    })
    newUser.save().then((data) => {
        console.log('User registered successfully');
        res.status(200).send({message: 'User registered successfully', data});
    }).catch((err) => {
        const errorCode = err.errorResponse.code;
        if (errorCode == 11000) {
            console.log('User already exists');
            // next();
            res.status(400).send('User already exists');
        }
        console.log(errorCode);
    });


}

module.exports = { registerUser };