const express = require('express')
const multer = require('multer')
const path = require('path');
const { uploadFile, getFileByAccessId } = require('../controllers/fileController');

const router = express()

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage })

router.post("/upload", upload.single('file', uploadFile))
router.get('/:accessId', getFileByAccessId);

module.exports = router