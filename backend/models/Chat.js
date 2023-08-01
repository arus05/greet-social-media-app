const ObjectId = mongoose.Schema.Types.ObjectId
const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
  participants: [{
    type: ObjectId,
    ref: "User"
  }],
  messages: [
    {
      sender: { type: ObjectId, ref: "User" },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now}
    }
  ]
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)