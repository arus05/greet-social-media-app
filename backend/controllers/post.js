const mongoose = require("mongoose")
const Post = require("../models/Post.js")
const User = require("../models/User.js")

// CREATE
async function createPost(req, res) {
  try {
    const {
      userId,
      caption,
      postImage,
    } = req.body
  
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User does not exist")
    }
    
    const newPost = await Post.create({
      userId,
      username: user.username,
      profilePicture: user.profilePicture,
      caption,
      postImage,
      likes: {},
      comments: []
    })

    await User.findByIdAndUpdate(user._id, {
      $push: {
        posts: newPost._id
      }
    })

    const updatedPosts = await Post.find()
    res.status(201).json(updatedPosts)

  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

// READ
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

async function getUserPosts(req, res) {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("Couldn't find user")
    }

    const postIds = user.posts
    const posts = await Post.find({
      _id : {
        $in: postIds
      }
    })
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// UPDATE
function editPost(req, res) {
  return
}

async function likePost(req, res) {
  try {
    const { postId } = req.params
    const { userId } = req.body
    const post = await Post.findById(postId)
    const isLiked = Boolean(post.likes.get(userId))

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }
    
    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      likes: post.likes
    }, { new: true })

    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

async function addCommentOnPost(req, res) {
  try {
    const { postId } = req.params
    const { userId, content } = req.body
    const post = await Post.findById(postId)

    if (!post) {
      throw new Error("Couldn't find post")
    }
    
    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      $push: {
        comments: {
          user: new mongoose.Types.ObjectId(userId),
          content
        }
      }
    }, { new: true })

    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// DELETE
async function deletePost(req, res) {
  try {
    /**
     * check if authenticated user is owner of the post
     */

    /** DELETE POST */
    const { postId } = req.params
    console.log(postId)
    const post = await Post.findByIdAndDelete(postId)

    if (!post) {
      throw new Error("Couldn't find post")
    }
    
    /** UPDATE USER POSTS LIST */
    const { userId } = post
    await User.findByIdAndUpdate(userId, {
      $pull: {
        posts: new mongoose.Types.ObjectId(postId)
      }
    })

    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  editPost,
  likePost,
  addCommentOnPost,
  deletePost
}