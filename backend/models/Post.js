const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "defaultProfilePicture.jpg"
  },
  caption: {
    type: String,
    required: true
  },
  postImage: {
    type: String
  },
  likes: {
    type: Map,
    of: Boolean
  },
  comments: [
    {
      user: { type: ObjectId, ref: "User", required: true},
      body: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)
module.exports = Post