const path = require("path")
const mongoose = require("mongoose")
const Post = require("../models/Post.js")
const User = require("../models/User.js")
const { getStorage, getDownloadURL } = require("firebase-admin/storage")
const { json } = require("express")

// CREATE
async function createPost(req, res) {
  try {
    const {
      caption,
    } = req.body
    const userId = req.user._id
    let postImage = undefined
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User does not exist")
    }

    /** UPLOAD IMAGE TO FIREBASE */
    if (req.file) {
      /** CREATE A UNIQUE FILE NAME */
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = path.extname(req.file.originalname)
      const filename = `${req.file.fieldname}-${uniqueSuffix}${extension}`
      
      /** UPLOAD IMAGE TO FIREBASE */
      const fileBuffer = req.file.buffer
      const bucket = getStorage().bucket();
      const fileRef = bucket.file(`postImage/${filename}`);

      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      
      postImage = await getDownloadURL(fileRef)
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

    const updatedPosts = await Post.find().sort({ createdAt: -1 })
    res.status(201).json(updatedPosts)

  } catch (err) {
    console.log(err.message)
    res.status(409).json({ message: err.message })
  }
}

// READ
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

async function getUserPosts(req, res) {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).sort({ createdAt: -1 })

    if (!user) {
      throw new Error("Couldn't find user")
    }

    const postIds = user.posts
    const posts = await Post.find({
      _id : {
        $in: postIds
      }
    }).sort({ createdAt: -1 })
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
    console.log(err.message)
    res.status(404).json({ message: err.message })
  }
}

async function addCommentOnPost(req, res) {
  try {
    const { postId } = req.params
    const { userId, body } = req.body
    const user = await User.findById(userId)
    const post = await Post.findById(postId)

    if (!post) {
      throw new Error("Couldn't find post")
    }
    
    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      $push: {
        comments: {
          user: new mongoose.Types.ObjectId(userId),
          username: user.username,
          profilePicture: user.profilePicture,
          body
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
    const { postId } = req.params
    /** AUTHORIZATION  */
    if (!req.user.posts.find(post => post._id.toString() === postId)) {
      return res.status(403).json({ message: "Permission denied" })
    }

    /** DELETE POST */
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

    /** DELETE ASSOCIATED POST IMAGE */

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