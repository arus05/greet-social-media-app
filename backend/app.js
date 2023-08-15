/** IMPORTS */
require("dotenv").config()
const cors = require("cors")
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
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require(process.env.FIREBASE_KEY_PATH)

/** CONFIGURATIONS */
const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}))
app.use(express.json()) // parse application/json
app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
// app.use("/assets", express.static(`${__dirname}/public/assets`))
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'greet-social-media-app.appspot.com',
});

/** FILE STORAGE */
const maxFileSize = 5 * 1024 * 1024

const storage = multer.memoryStorage()
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