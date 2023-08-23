import { useRef, useState } from "react";
import formatDistance from 'date-fns/formatDistance'
import { useUserContext } from "../hooks/useUserContext";
import { usePostContext } from "../hooks/usePostContext";
import Loading from "./Loading"
import Comments from "./Comments";

import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as FilledHeartIcon,
} from "@heroicons/react/24/solid";

const Post = ({ post, setClickedPostImage }) => {

  const {
    _id,
    userId,
    username,
    profilePicture,
    caption,
    postImage,
    likes,
    comments,
    createdAt
  } = post
  const { user, token } = useUserContext()
  const { dispatch: dispatchPost } = usePostContext()

  const likedPost = post?.likes[user._id]
  const profilePictureURL = profilePicture
  const postImageURL = postImage
  const timeAgo = formatDistance(new Date(createdAt), new Date())

  const [clickedOnOptions, setClickedOnOptions] = useState(false)
  const [isDeletingPost, setIsDeletingPost] = useState(false)
  const [isLikingPost, setIsLikingPost] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)

  const options = useRef(null)

  /** FUNCTIONS */
  const deletePost = async () => {
    setIsDeletingPost(true)
    if (token) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${_id}`, {
        method: "delete",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: {
          userId: user._id
        }
      })
      const deletedPost = await res.json()
      if (res.ok) {
        console.log("deleted post: " + deletedPost)
        dispatchPost({ type: "deletePost", payload: _id })
      }
    }
    setIsDeletingPost(false)
  }

  const likePost = async () => {
    if (isLikingPost) return

    dispatchPost({ type: "likePost", payload: { userId: user._id, postId: _id } })
    setIsLikingPost(true)

    if (token) {
      dispatchPost({ type: "likePost", payload: { userId: user._id, } })
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${_id}/like`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: user._id
        }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
      if (!res.ok) {
        dispatchPost({ type: "likePost", payload: { userId: user._id, } })
      }
    }

    setIsLikingPost(false)
  }

  const addComment = async (e) => {
    e.preventDefault()
    setIsAddingComment(true)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${_id}/comment`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        body: newComment
      })
    })
    if (res.ok) {
      const updatedPost = await res.json()
      dispatchPost({ type: "updatePost", payload: updatedPost })
    }
    setNewComment("")
    setIsAddingComment(false)
  }

  /** EVENT LISTENERS */
  document.addEventListener("mousedown", (e) => {
    if (!clickedOnOptions && !options?.current?.contains(e.target)) {
      setClickedOnOptions(false)
    }
  })

  /** RETURN */
  return (
    <div className={`rounded-2xl bg-white mb-5 p-6 shadow-lg shadow-gray-300 border-light
          dark:bg-primary-dark dark:text-text-dark dark:shadow-none dark:border-dark
    `}>
      <div className="flex-center gap-4 mb-5">
        <div className="profile-pic-wrapper">
          <img src={profilePictureURL} alt="profile picture" className="img-fit" />
        </div>
        <div>
          <p className="font-medium">
            {username}
          </p>
          <p className="text-text-subtle text-sm">{timeAgo} ago</p>
        </div>
        { userId === user._id &&
          <div className="ml-auto relative" ref={options}>
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => setClickedOnOptions(prev => !prev)} />
          { clickedOnOptions && 
            <ul className="drop-down p-2 rounded-lg shadow-md top-8 absolute right-0"> {/** DROPDOWN */}
              <li className="rounded-full p-1 sm:hover:bg-bg-hover sm:dark:hover:bg-bg-hover-dark">
                {isDeletingPost ? 
                  <Loading /> :
                  <button onClick={deletePost} disabled={isDeletingPost}>
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>}
              </li>
            </ul> }
        </div>}
      </div>
      <div className="mb-5">
        <p className="break-words">
          {caption}
        </p>
      </div>
      { postImage &&
        <div href={postImageURL} className="rounded-xl overflow-hidden mb-5 w-full cursor-pointer">
          <img src={postImageURL} alt="" className="img-fit"
            onClick={() => setClickedPostImage(postImageURL)}
          />
        </div>
      }
      <div className="flex-center gap-4">
        <button className="flex-center gap-1" onClick={likePost}>
          {likedPost ? 
            <FilledHeartIcon className="post-icon text-red-500" /> :
            <HeartIcon className="post-icon " />
          }
          <p>{Object.keys(likes)?.length || 0}</p>
        </button>
        <button className="flex-center gap-1" onClick={() => setShowComments(prev => !prev)}>
          <ChatBubbleLeftIcon className="post-icon" />
          <p>{comments?.length || 0}</p>
        </button>
        <button>
          <ShareIcon className="post-icon" />
        </button>
      </div>

      {/* COMMENTS */}
      { showComments &&
        <div className="max-h-[200px] w-full h-auto relative overflow-x-hidden
          mt-3 px-1
        ">
          <Comments comments={comments} />
          <form className="flex-center gap-2 bg-bg-hover w-full rounded-lg mt-2 px-3 py-2 shadow-xl
            shadow-grey-500 dark:bg-bg-hover-dark dark:shadow-none sticky bottom-0"
            autoComplete="off"
            onSubmit={addComment}
          >
            <input type="text"
              required
              className="flex-1 rounded-lg p-1"
              placeholder="add comment"
              value={newComment}
              name="new-comment"
              onChange={(e) => setNewComment(e.target.value)}
              autoFocus={true}
            />
            { isAddingComment ?
              <Loading /> :
              <button>
                <PaperAirplaneIcon className="h-6 w-6 text-text dark:text-text-dark" />
              </button>
            }
          </form>
        </div>
      } { /** COMMENTS END */}
    </div>
  );
}

export default Post;

// Post.propTypes = {
//   post: {
//     _id: PropTypes.String,
//     username: PropTypes.String,
//     profilePicture: PropTypes.String,
//     caption: PropTypes.String,
//     postImage: PropTypes.String,
//     likes: PropTypes.String,
//     comments: PropTypes.String,
//     createdAt: PropTypes.String
//   }
// }