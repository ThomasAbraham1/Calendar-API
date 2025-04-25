const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var dbUrl = process.env.dbUrl_PRODUCTION;
if (process.env.NODE_ENV != 'production') {
    dbUrl = process.env.dbUrl_DEVELOPMENT;
}

const dbConnect = async () => {
    mongoose.connect(dbUrl)
        .then(() => console.log('Connected!'));
}

module.exports = {mongoose, dbConnect};