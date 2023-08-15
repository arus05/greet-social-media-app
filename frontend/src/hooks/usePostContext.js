import { useContext } from "react"
import { PostContext } from "../context/postContext"

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error("Theme context can only be used inside PostContextProvider")
  }
  return context
}