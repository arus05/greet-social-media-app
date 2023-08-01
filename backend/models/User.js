const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "defaultProfilePicture.jpg"
  },
  location: {
    type: String,
    required: true
  },
  friends: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  posts: [
    {
      type: ObjectId,
      ref: "Post",
    }
  ],
  chats: [
    {
      type: ObjectId,
      ref: "Chat"
    }
  ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User