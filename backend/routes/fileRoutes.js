const express = require('express');
const multer = require('multer');
const { uploadFile, getFileByAccessId, singleUpload, MGUpload } = require('../controllers/fileController');

const router = express.Router(); // Use express.Router() instead of express()

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post("/upload", upload.single('file'), uploadFile); // Corrected usage of upload.single()
router.get('/:accessId', getFileByAccessId);

module.exports = router;