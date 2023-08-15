import { createContext, useEffect, useReducer } from "react"
import { useUserContext } from "../hooks/useUserContext"
export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case "setPosts":
        return {
          ...prevState,
          posts: action.payload
        }
      
      case "deletePost":
        return {
          ...prevState,
          posts: prevState.posts.filter(post => post._id !== action.payload)
        }
      
      case "likePost":
        return {
          ...prevState,
          posts: prevState.posts.map(post => {
            if (post._id === action.payload.postId) {
              const updatedLikes = {...post.likes}
              const liked = post.likes[action.payload.userId]
              if (liked) {
                delete updatedLikes[action.payload.userId]
              }
              else {
                updatedLikes[action.payload.userId] = true
              }
              return {...post, likes: updatedLikes}
            }
            return post
          })
        }
      
      case "updatePost":
        return {
          ...prevState,
          posts: prevState.posts.map(post => {
            if (post._id === action.payload._id) {
              return action.payload
            }
            return post
          })
        }
      
      default:
        return prevState
    }
  }
  const [state, dispatch] = useReducer(reducer, { posts: null })
  const { token } = useUserContext()

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL)
    async function getPosts() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: "setPosts", payload: data })
      }
      else {
        console.log(data.message)
      }
    }
    if (token) {
      try {
        getPosts()
      } catch (err) {
        console.log(err)
      }
    }
  }, [token])

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PostContext.Provider>
  );
}
 
export default PostContextProvider;