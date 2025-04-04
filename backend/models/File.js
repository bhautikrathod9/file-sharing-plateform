const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    accessId : { type: String, required: true, unique: true },
    cloudinaryUrl : { type: String, required: true },
    publicId : { type: String, required: true },
    createdAt : { type: Date, default: Date.now},
})

module.exports = mongoose.model('File', fileSchema)