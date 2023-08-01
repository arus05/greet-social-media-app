const mongoose = require("mongoose")

// READ
function getUser(req, res) {
  // Remove Password
}

function getUserFriends(req, res) {
  // Remove Password
}

// UPDATE
function updateUser(req, res) {

}

function addRemoveFriend(req, res) {
  
}

// DELETE
function deleteUser(req, res) {
  res.status(500).json({ message: "Feature not implemented yet" })
}

module.exports = {
  getUser,
  getUserFriends,
  updateUser,
  addRemoveFriend,
  deleteUser,
}