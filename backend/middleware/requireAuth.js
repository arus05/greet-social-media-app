const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

async function requireAuth(req, res, next) {
  try {
    let token = req.header("Authorization")
    if (!token) {
      return res.status(403).send("Access Denied")
    }

    if (token.toLowerCase().startsWith("bearer ")) {
      token = token.slice(7).trimLeft()
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(userId)
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

module.exports = requireAuth