import { redirect } from "react-router-dom"

export default function requireAuth(path) {
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  if (!token || !user) {
    throw redirect(path)
  }
}