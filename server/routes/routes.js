const {meetingTranscribeController} = require('../controllers/meetingTranscribeController');
const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });    



router.post('/upload', upload.single('file'), meetingTranscribeController);


module.exports={
    router
}