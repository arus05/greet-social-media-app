import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("Theme context can only be used inside ThemeContextProvider")
  }
  return context
}