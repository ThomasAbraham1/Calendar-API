const { User } = require('../db/models/user');

const findUser = async (req, res, next) => {
    const result = User.findOne({ userId: req.body.userId }).then((user) => {
        if (user) {
            console.log('User found:', user);
            res.status(200).send(user);
        } else {
            console.log('User not found');
            res.status(404).send('User not found');
        }
    });
}

module.exports = { findUser };