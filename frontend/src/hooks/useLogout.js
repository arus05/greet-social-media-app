import { useState } from "react"
import { useUserContext } from "./useUserContext"

export const useLogout = () => {

  const { dispatch: dispatchUser } = useUserContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const logout = () => {
    setLoading(true)
    setError(null)
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      dispatchUser({ type: "logout" })
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  return { logout, loading, error }

}