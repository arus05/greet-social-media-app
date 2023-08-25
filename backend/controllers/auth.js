const defaultProfilePicture = "https://firebasestorage.googleapis.com/v0/b/greet-social-media-app.appspot.com/o/profilePicture%2Fkyojuro%20rengoku2.png?alt=media&token=ad58908c-0dc6-4682-95e4-a8dd63610dc0"
const path = require("path")
const mongoose = require("mongoose")
const User = require("../models/User")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { getStorage, getDownloadURL } = require("firebase-admin/storage")

async function signup(req, res) {
  try {
    const {
      username,
      email,
      password,
      location
    } = req.body
    let profilePicture = defaultProfilePicture
  
    /** FIELD VERIFICATION */
    await verifyFieldsSignup({ username, email, password, location })

    /** UPLOAD IMAGE TO FIREBASE */
    if (req.file) {
      /** CREATE A UNIQUE FILE NAME */
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = path.extname(req.file.originalname)
      const filename = `${req.file.fieldname}-${uniqueSuffix}${extension}`
      
      /** UPLOAD IMAGE TO FIREBASE */
      const fileBuffer = req.file.buffer
      const bucket = getStorage().bucket();
      const fileRef = bucket.file(`profilePicture/${filename}`);

      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      profilePicture = await getDownloadURL(fileRef)
    }

    /** PASSWORD ENCRYPTION */
    const hash = await encryptPassword(password)

    const newUser = await User.create({
      username,
      email,
      password: hash,
      profilePicture,
      location,
      friends: [],
      posts: [],
      chats: [],
    })
    newUser.password = undefined
    
    const token = generateToken({ userId: newUser._id })

    res.status(201).json({ user: newUser, token })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
  
}

async function login(req, res) {
  try {
    const {
      username,
      password,
    } = req.body
  
    /** FIELD VERIFICATION */
    const user = await verifyFieldsLogin({ username, password })
    
    const token = generateToken({ userId: user._id })

    res.status(200).json({ user, token })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

async function verifyFieldsSignup({ username, email, password, location }) {
  if (!username || !email || !password || !location) {
    throw new Error("Please fill in all fields!")
  }

  if (await User.findOne({ username })) {
    throw new Error("Username already taken, please choose a different username.")
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email")
  }

  if (await User.findOne({ email })) {
    throw new Error("Email already taken, please choose a different email.")
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak.")
  }
}

async function verifyFieldsLogin({ username, password }) {
  if (!username || !password) {
    throw new Error("Please fill in all fields!")
  }
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error("Invalid username")
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error("Invalid credentials")
  }
  user.password = undefined
  return user
}

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)
  return hash
}

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3d"
  })
  return token
}

module.exports = {
  signup,
  login
}