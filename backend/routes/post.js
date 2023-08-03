const express = require("express")
const router = express.Router()
const {
  getAllPosts,
  getUserPosts,
  editPost,
  likePost,
  addCommentOnPost,
  deletePost
} = require("../controllers/post.js")
const requireAuth = require("../middleware/requireAuth.js")

/** Authorization */
router.use(requireAuth)

/** READ */
router.get("/", getAllPosts)
router.get("/:userId/posts", getUserPosts)

/** UPDATE */
router.patch("/:postId", editPost)
router.patch("/:postId/like", likePost)
router.patch("/:postId/comment", addCommentOnPost)

/** DELETE */
router.delete("/:postId", deletePost)

module.exports = router