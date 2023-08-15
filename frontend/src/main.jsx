import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeContextProvider from "./context/themeContext"
import UserContextProvider from './context/userContext.jsx'
import PostContextProvider from './context/postContext.jsx'
import SuggestionContextProvider from './context/suggestionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <SuggestionContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </SuggestionContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
