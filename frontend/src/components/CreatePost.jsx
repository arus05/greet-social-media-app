import { useRef, useState } from "react";
import Loading from "./Loading"
import {
  PhotoIcon,
  VideoCameraIcon,
  PaperClipIcon,
  HashtagIcon,
  AtSymbolIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useUserContext } from "../hooks/useUserContext";
import { usePostContext } from "../hooks/usePostContext"

const MAX_FILE_SIZE_IN_MB = 5
const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB*1024*1024

const CreatePost = () => {
  const fileInput = useRef(null)
  const [postImage, setPostImage] = useState(null)
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState("idle")
  const [error, setError] = useState([])
  const [postImageError, setPostImageError] = useState(null)
  const { user, token } = useUserContext()
  const { dispatch: dispatchPost } = usePostContext()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading("submitting")
    setError(null)
    const formData = new FormData()
    formData.append("post-image", postImage)
    formData.append("caption", caption)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: "post",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    })
    if (res.ok) {
      const newPosts = await res.json()
      dispatchPost({ type: "setPosts", payload: newPosts })
    }
    else {
      const err = await res.json()
      setError(err)
    }
  
    setPostImage(null)
    setCaption("")
    setLoading("idle")
  }

  function handlePostImageUpload(e) {
    setPostImageError(null)
    setPostImage(null)
    const postImage = e.target.files[0]
    if (postImage.size > MAX_FILE_SIZE) {
      return setPostImageError({ message: "File size too large "})
    }
    setPostImage(postImage)
  }

  return (
    <form
      className="
        p-4 w-full bg-white rounded-xl mb-6 shadow-md shadow-gray-300
         dark:bg-primary-dark dark:border-dark dark:shadow-none
      "
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <div className="flex-center gap-4 mb-2">
          <div className="h-12 w-12 rounded-full overflow-hidden shrink-0">
            <img src={user.profilePicture} alt="profile picture" className="img-fit" />
          </div>
          <div className="flex-center flex-grow bg-gray-200 rounded-2xl px-2
                dark:bg-search-dark dark:text-text-dark placeholder:dark:text-primary-dark
          ">
            <input type="text" placeholder="Share something..."
              className="
                px-1 py-3 w-full
              "
              name="caption"
              value={caption}
              onChange={(e) => {setCaption(e.target.value)}}
            />
            {
              loading === "submitting" ? 
                <Loading /> :
                (caption.length === 0 ?
                <FaceSmileIcon className="h-6 w-6 text-gray-500 dark:text-primary-dark" /> :
                  <button>
                    <PaperAirplaneIcon className="h-6 w-6 text-secondary"/>
                  </button>
                )
            }
          </div>
        </div>
        {postImage &&
          <div className=" flex-center gap-3 text-text-subtle dark:text-text-subtle-dark">
            <p>Uploaded Image: {postImage?.name}</p>
            <button onClick={() => setPostImage(null)}>
             <XMarkIcon className="h-6 w-6 text-red-500" />
            </button>
          </div>
        }
        {
          !postImage && postImageError && 
          <p className="text-red-500 w-full text-center font-medium">{postImageError.message}</p>
        }
      </div>
      <hr className="w-full h-[2px] bg-gray-200 my-3" />
      <ul className="flex-center gap-3 flex-wrap justify-between dark:text-text-dark">
        <li className="create-post-li">
          <button className="create-post-btn" onClick={(e) => {
            e.preventDefault()
            fileInput.current.click()
          }}>
            <PhotoIcon className="h-6 w-6 text-secondary" />
            <p>Image</p>
          </button>
          <input type="file" name="post-image" className="hidden" ref={fileInput} accept=".jpg,.png,.pdf"
            onChange={handlePostImageUpload} />
        </li>
        <li className="create-post-li">
          <button className="create-post-btn" onClick={(e) => e.preventDefault()}>
            <VideoCameraIcon className="h-6 w-6 text-secondary" />
            <p>Video</p>
          </button>
        </li>
        <li className="create-post-li">
          <button className="create-post-btn" onClick={(e) => e.preventDefault()}>
            <PaperClipIcon className="h-6 w-6 text-secondary" />
            <p>Attachment</p>
          </button>
        </li>
        <li className="create-post-li">
          <button className="create-post-btn" onClick={(e) => e.preventDefault()}>
            <HashtagIcon className="h-6 w-6 text-secondary" />
            <p>Hashtag</p>
          </button>
        </li>
        <li className="create-post-li">
          <button className="create-post-btn" onClick={(e) => e.preventDefault()}>
            <AtSymbolIcon className="h-6 w-6 text-secondary" />
            <p>Mention</p>
          </button>
        </li>
      </ul>
    </form>
  );
}

export default CreatePost;