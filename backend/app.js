/** IMPORTS */
const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const connectDb = require("./utils/connectDb.js")
const multer = require("multer")
const path = require("path")
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const postRoutes = require("./routes/post.js")
const { signup } = require("./controllers/auth.js")
const { createPost } = require("./controllers/post.js")

/** CONFIGURATIONS */
dotenv.config()
const app = express()
app.use(express.json()) // parse application/json
app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use("/assets", express.static(`${__dirname}/public/assets`))

/** FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
}, { timestamps: true })

const upload = multer({ storage })

/** ROUTES WITH FILES */
app.post("/api/auth/signup", upload.single("profile-picture"), signup)
app.post("/api/posts", upload.single("post-image"), createPost)

/** ROUTES WITHOUT FILES */
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

/** MONGODB SETUP */
const PORT = process.env.PORT || 6001
const DB_URI = process.env.MONGODB_URI
connectDb(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })




