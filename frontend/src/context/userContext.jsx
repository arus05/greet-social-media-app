import { createContext, useEffect, useReducer } from "react"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  useEffect(() => {
    let user = localStorage.getItem("user")
    let token = localStorage.getItem("token")
    if (user) user = JSON.parse(user)
    if (token) token = JSON.parse(token)
    if (user && token) {
      dispatch({ type: "login", payload: { user, token } })
    }
  }, [])

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "login":
        return {
          user: action.payload.user,
          token: action.payload.token
        }
      
      case "logout":
        return {
          user: null,
          token: ""
        }
      
      case "addRemoveFriend":
        if (prevState.user.friends.includes(action.payload)) {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              friends: prevState.user.friends.filter(friend => friend !== action.payload)
            }
          }
        }
        else {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              friends: [...prevState.user.friends, action.payload]
            }
          }
        }
      
      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    user: null,
    token: ""
  })

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      { children }
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;