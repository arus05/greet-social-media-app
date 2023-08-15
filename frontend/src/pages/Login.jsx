import { Form, useActionData, useNavigation } from "react-router-dom";
import { UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import backgroundImg from "../assets/loginPageBG.jpg"

export async function action({ request, dispatchUser }) {
  const formData = await request.formData()
  
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password")
    })
  })
  
  if (!res.ok) {
    try {
      const err = await res.json()
      return err?.message || null
    } catch (err) {
      throw {
        status: 500,
        statusText: "Connection error",
        data: "Failed to connect to server"
      }
    }
  }

  const data = await res.json()
  dispatchUser({ type: "login", payload: data })
  localStorage.setItem("user", JSON.stringify(data.user))
  localStorage.setItem("token", JSON.stringify(data.token))
  return null
}

const Login = () => {

  const errorMessage = useActionData()
  const navigation = useNavigation()

  return(
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Form className="w-[450px] bg-white bg-opacity-70 px-16 py-10 rounded-xl" method="POST" replace>
        <h2 className="text-2xl font-semibold mb-5">
          Sign In
        </h2>
        <div className="flex-center gap-3 border-4 rounded-lg px-5 py-2 mb-5 border-accent">
          <label htmlFor="username-input" className="">
            <UserIcon className="h-6 w-6 text-gray-500" />
          </label>
          <input
            type="username" id="username-input" className="placeholder:text-accent p-1" name="username" required
            placeholder="Username"
          />
        </div>
        <div className="flex-center gap-3 border-4 rounded-lg px-5 py-2 mb-3 border-accent">
          <label htmlFor="password-input" className="">
            <KeyIcon className="h-6 w-6 text-gray-500" />
          </label>
          <input
            type="password" id="password-input" className="placeholder:text-accent p-1" name="password" required
            placeholder="Password"
          />
        </div>
        {errorMessage &&
          <div className="text-red-500 font-bold text-center">
            <p>
              { errorMessage }
            </p>
          </div>
        }
        <div className="flex-center justify-between mb-5">
          <div className="flex-center gap-2">
            <input
              type="checkbox" id="rmb-me-checkbox"
              className="accent-accent"
            />
            <label htmlFor="rmb-me-checkbox" className="">Remember me</label>
          </div>
          <div>
            <a href="#" className="">
              Need help?
            </a>
          </div>
        </div>
        <button className="w-full btn rounded-lg p-3 text-white mb-3"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Signing In..." : "Sign In"}
        </button>
        <p>
          Don't have an account? Sign up
          <a href="/signup" className="ml-1 underline text-lg font-semibold">
            here
          </a>
          .
        </p>
        
      </Form>
      <div className="absolute w-full h-full top-0 left-0 -z-10 blur-sm">
        <img src={backgroundImg} alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
 
export default Login;