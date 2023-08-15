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
    default: "https://firebasestorage.googleapis.com/v0/b/greet-social-media-app.appspot.com/o/profilePicture%2Fkyojuro%20rengoku2.png?alt=media&token=ad58908c-0dc6-4682-95e4-a8dd63610dc0"
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