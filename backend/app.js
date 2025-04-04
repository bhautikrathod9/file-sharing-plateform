const express = require('express')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')
const cloudinary = require('./utils/cloudinary');
const fs = require('fs');

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests from specific origins
      const allowedOrigins = ["http://localhost:5173"];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization"
  };

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api/files', fileRoutes)
app.get('/', (req, res) => {
    res.send("Api is working")
    console.log("server is running")
})

module.exports = app