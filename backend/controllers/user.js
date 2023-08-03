const mongoose = require("mongoose")
const User = require("../models/User")

// READ
async function getUser(req, res) {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).select({ password: 0 })
    if (!user) {
      throw new Error("Could not find user")
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

async function getUserFriends(req, res) {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("User does not exist")
    }
    const userFriendsId = user.friends
    const userFriends = await User.find({
      _id: {
        $in: userFriendsId
      }
    }).select({ password: 0 })

    res.status(200).json(userFriends)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// UPDATE
function updateUser(req, res) {
  res.status(500).json({ message: "Feature not implemented yet" })
}

async function addRemoveFriend(req, res) {
  try {
    const { userId, friendId } = req.params
    if (userId === friendId) {
      return res.status(400).json({ message: "User cannot add themselves as friend" })
    }

    let user = await User.findById(userId)
    let friend = await User.findById(friendId)
    if (!user) {
      throw new Error("User does not exist")
    }
    if (!friend) {
      throw new Error("Friend does not exist")
    }

    if (user.friends.includes(new mongoose.Types.ObjectId(friendId))) {
      console.log("remove friend")
      user.friends = user.friends.filter(friend => friend.toString() !== friendId)
      friend.friends = friend.friends.filter(friend => friend.toString() !== userId)
      user = await User.findByIdAndUpdate(userId, {
        $set: {
          friends: user.friends
        }
      }, { new: true })
      friend = await User.findByIdAndUpdate(friendId, {
        $set: {
          friends: friend.friends
        }
      }, { new: true })
    }
    else {
      console.log("add friend")
      user = await User.findByIdAndUpdate(userId, {
        $push: {
          friends: friendId
        }
      }, { new: true })
      friend = await User.findByIdAndUpdate(friendId, {
        $push: {
          friends: userId
        }
      }, { new: true })
    }
    res.status(200).json({ user, friend })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// DELETE
async function deleteUser(req, res) {
  try {
    const { userId } = req.params
    const deletedUser = await mongoose.findByIdAndDelete(userId)

    /**
     * ADDITIONAL ACTIONS NOT IMPLEMENTED: (LOOKUP MONGOOSE "PRE" MIDDLEWARE)
     * 1. DELETE USER FROM ALL FRIENDLISTS
     * 2. DELETE POSTS CREATED BY USER
     * 3. DELETE COMMENTS MADE BY USER
     */
    res.status(200).json(deletedUser)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = {
  getUser,
  getUserFriends,
  updateUser,
  addRemoveFriend,
  deleteUser,
}