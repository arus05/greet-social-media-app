import { useContext } from "react"
import { SuggestionContext } from "../context/suggestionContext"

export const useSuggestionContext = () => {
  const context = useContext(SuggestionContext)
  if (!context) {
    throw new Error("Suggestion context can only be used inside SuggestionContextProvider")
  }
  return context
}