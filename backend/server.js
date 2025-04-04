const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected")
        app.listen(PORT, () => {
            console.log(`App is listniing at PORT ${PORT}`)
        })
    })
    .catch((err) => console.error(err));