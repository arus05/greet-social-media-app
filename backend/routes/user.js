const express = require("express")
const router = express.Router()
const {
  getUsers,
  getUser,
  getUserFriends,
  updateUser,
  addRemoveFriend,
  deleteUser,
} = require("../controllers/user.js")
const requireAuth = require("../middleware/requireAuth.js")

/** Authorization */
router.use(requireAuth)

/** READ */
router.get("/", getUsers)
router.get("/:userId", getUser)
router.get("/:userId/friends", getUserFriends)

/** UPDATE */
router.patch("/:userId", updateUser)
router.patch("/:userId/:friendId", addRemoveFriend)

/** DELETE */
router.delete("/:userId", deleteUser)

module.exports = router