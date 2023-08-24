import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements, redirect, Navigate } from "react-router-dom"
import { useThemeContext } from "./hooks/useThemeContext"
import { useUserContext } from "./hooks/useUserContext"
import requireAuth from "./utils/requireAuth"
import Layout from "./components/Layout"
import Login, { action as loginAction } from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Error from "./pages/Error"

function App() {
  const { colorScheme } = useThemeContext()
  const { user, dispatch: dispatchUser } = useUserContext()

  function layoutLoader() {
    requireAuth("/login")
    return null
  }

  function homeLoader() {
    requireAuth("/login")
    return null
  }
  
  function loginLoader() {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      throw redirect("/")
    }
    return null
  }

  async function profileLoader({ params }) {
    const { token } = requireAuth("/login")

    const { userId } = params
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!res.ok) {
      throw {
        status: 404,
        statusText: "Not Found",
        data: "Couldn't find user"
      }
    }
    
    const user = await res.json()
    return user
  }

  const BrowserRouter = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login"/>} errorElement={<Error />} loader={layoutLoader} >
        <Route index element={<Home />} loader={homeLoader}/>
        <Route path=":userId" element={<Profile />} loader={profileLoader} />
      </Route>
      <Route path="/login" element={<Login />}
        action={async ({ request }) => {
          const data = await loginAction({ request, dispatchUser })
          return data || null
        }}
        loader={loginLoader}
      />
      <Route path="/signup" element={<Signup />} />
    </>
  ))

  return (
    <div id="app"
      className={`app ${colorScheme === "dark" ? "dark" : ""} font-sans overflow-x-hidden`}
    >
      <RouterProvider router={BrowserRouter} />
    </div>
  )
}

export default App
