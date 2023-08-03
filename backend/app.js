/** IMPORTS */
const dotenv = require("dotenv")
const express = require("express")
const multer = require("multer")
const path = require("path")
const connectDb = require("./utils/connectDb.js")
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const postRoutes = require("./routes/post.js")
const { createPost } = require("./controllers/post.js")
const { signup } = require("./controllers/auth.js")
const requireAuth = require("./middleware/requireAuth.js")

/** CONFIGURATIONS */
dotenv.config()
const app = express()
app.use(express.json()) // parse application/json
app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use("/assets", express.static(`${__dirname}/public/assets`))

/** FILE STORAGE */
const maxFileSize = 2E7
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
  }
}, { timestamps: true })

const upload = multer({ storage, limits: { fileSize: maxFileSize } })

/** ROUTES WITH FILES */
app.post("/api/posts", requireAuth, upload.single("post-image"), createPost)
app.post("/api/auth/signup", upload.single("profile-picture"), signup)

/** ROUTES */
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




