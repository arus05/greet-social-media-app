import { createContext, useReducer } from "react"

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "toggleColorScheme":
        return {
          ...prevState,
          colorScheme: prevState.colorScheme === "dark" ? "light" : "dark"
        }
      default:
        return prevState
    }
  }

  const [state, dispatch] = useReducer(reducer, { colorScheme: "light" })

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ThemeContext.Provider>
  );
}
 
export default ThemeContextProvider;