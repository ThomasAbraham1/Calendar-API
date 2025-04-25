const {meetingTranscribeController} = require('../controllers/meetingTranscribeController');
const {registerUser} = require('../controllers/userRegistration');
const {findUser} = require('../controllers/findUser');
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.post('/upload', upload.single('file'), meetingTranscribeController);
router.post('/userRegistration', registerUser, findUser);


module.exports={
    router
}