const express = require("express")
const router = express.Router()
const {
  getUser,
  getUserFriends,
  updateUser,
  addRemoveFriend,
  deleteUser,
} = require("../controllers/user.js")

/** READ */
router.get("/:userId", getUser)
router.get("/:userId/friends", getUserFriends)

/** UPDATE */
router.patch("/:", updateUser)
router.patch("/:userId/:friendId", addRemoveFriend)

/** DELETE (NOT IMPLEMENTED)*/
router.delete("/:userId", deleteUser)

module.exports = router