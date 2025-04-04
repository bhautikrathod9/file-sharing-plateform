const File = require('../models/File.js');
const cloudinary = require('cloudinary');
const fs = require('fs');

exports.singleUpload = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlink(req.file.path, () => {});

        return res.json({ url: result.secure_url });
    } catch (err) {
        console.error('Cloudinary upload error:', err);
        return res.status(500).json({ message: 'Upload error', error: err.message });
    }
}

exports.uploadFile = async (req, res) => {
    try {
        const { accessId } = req.body;
        if (!req.file || !accessId) {
        return res.status(400).json({ message: 'File and accessId are required' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'file_share',
        resource_type: 'auto', // handles all file types
        });

        fs.unlink(req.file.path, () => {}); // remove local temp file

        const newFile = new File({
        accessId,
        cloudinaryUrl: result.secure_url,
        publicId: result.public_id,
        });

        await newFile.save();

        return res.status(201).json({
        message: 'File uploaded and saved to DB',
        file: newFile
        });

    } catch (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ message: 'Upload failed', error: err.message });
    }
};

exports.getFileByAccessId = async (req, res) => {
    const { accessId } = req.params;

    try {
        const file = await File.findOne({ accessId });

        if (!file) return res.status(404).json({ message: "File not found" });

        res.status(200).json({ fileUrl: file.cloudinaryUrl });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving file", error: error.message });
    }
};