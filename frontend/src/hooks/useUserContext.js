import { useContext } from "react"
import { UserContext } from "../context/userContext"

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("User context can only be used inside UserContextProvider")
  }
  return context
}