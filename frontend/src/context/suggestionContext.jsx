import { createContext, useEffect, useReducer } from "react"
import { useUserContext } from "../hooks/useUserContext"
import selectRandom from "../utils/selectRandom"

export const SuggestionContext = createContext()

const SuggestionContextProvider = ({ children }) => {
  const { token } = useUserContext()
  useEffect(() => {
    const getSuggestions = async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const users = await res.json()
      const userSuggestions = selectRandom(users, 3)
      dispatch({ type: "setUserSuggestions", payload: userSuggestions })
      const pageSuggestions = selectRandom(users, 3)
      dispatch({ type: "setPageSuggestions", payload: pageSuggestions })
    }
    if (token) {
      getSuggestions()
    }
  }, [token])

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "setUserSuggestions":
        return {
          ...prevState,
          userSuggestions: action.payload
        }
      
      case "setPageSuggestions":
        return {
          ...prevState,
          pageSuggestions: action.payload
        }
      
      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    userSuggestions: [],
    pageSuggestions: []
  })

  return (
    <SuggestionContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SuggestionContext.Provider>
  );
}
 
export default SuggestionContextProvider;