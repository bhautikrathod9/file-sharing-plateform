const File = require('../models/File.js')
const cloudinary = require('cloudinary')
const fs = require('fs')

exports.uploadFile = async (req, res) => {
    const { accessId } = req.body;

    if(!req.file || !accessId){
        return res.status(400).json({ message: 'File and accessId is required'})
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'file_share',
        })

        const file = new File({
            accessId,
            cloudinaryUrl: result.secure_url,
            publicId: result.public_Id,
        })

        await file.save()

        fs.unlink(req.file.path, (err) => {
            if(err) console.error('Failed to delete temp file.', err)
        })
    
        res.status(201).json({message: "File uploaded", accessId})
    } catch (error) {
        res.status(500).json({message: 'Upload failed', error: error.message})
    }
}

exports.getFileByAccessId = async (req, res) => {
    const { accessId } = req.params;

    try{
        const file = await File.findOne({ accessId });

        if(!file) return res.status(404).json({ message: "file not found"})

        res.status(200).json({ fileUrl: file.cloudinaryUrl});
    }catch(error){
        res.status(500).json({message: "Error retreving file", error: error.message})
    }
}