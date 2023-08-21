import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, KeyIcon, EnvelopeIcon, MapIcon } from "@heroicons/react/24/solid";
import backgroundImg from "../assets/loginPageBG.jpg"
import countryList from 'react-select-country-list'
import ProfilePictureDropzone from "../components/ProfilePictureDropzone";
import { useUserContext } from "../hooks/useUserContext";

const Signup = () => {
  const navigate = useNavigate()
  const { dispatch: dispatchUser } = useUserContext()
  const countryOptions = useMemo(() => countryList().getData(), [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("location", location)
    formData.append("profile-picture", profilePicture)

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      setError(await res.json())
      setLoading(false)
      return
    }
    
    const { user, token } = await res.json()
    dispatchUser({ type: "login", payload: { user, token }})
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", JSON.stringify(token))
    setLoading(false)
    return navigate("/")
  }

  return(
    <div className="min-h-screen flex flex-col items-center justify-center p-3">
      <form className="max-w-[650px] bg-white bg-opacity-70 px-16 py-10 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-5">
          Hello, friend! Glad to see you!
        </h2>
        <div className="input-container">
          <label htmlFor="username-input" className="">
            <UserIcon className="h-6 w-6 text-gray-500" />
          </label>
          <input
            type="username" id="username-input" className="placeholder:text-accent p-1" name="username" required
            placeholder="Username" autoComplete="off"
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="email-input" className="">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
          </label>
          <input
            type="email" id="email-input" className="placeholder:text-accent p-1" name="email" required
            placeholder="Email" autoComplete="off"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password-input" className="">
            <KeyIcon className="h-6 w-6 text-gray-500" />
          </label>
          <input
            type="password" id="password-input" className="placeholder:text-accent p-1" name="password" required
            placeholder="Password" autoComplete="off"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-container hover:cursor-pointer">
          <label htmlFor="location" className="">
            <MapIcon className="h-6 w-6 text-gray-500" />
          </label>
          <select className="w-full bg-transparent cursor-pointer" required
            value={location} onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">
              Choose a country
            </option>
            {
              countryOptions.map(country => (
                <option value={country.label} key={country.value}>
                  { country.label }
                </option>
              ))
            }
          </select>
        </div>

        <ProfilePictureDropzone setProfilePicture={setProfilePicture} profilePicture={profilePicture} />
        
        {/** ERROR MESSAGE */}
        {error &&
          <div className="text-red-500 font-bold text-center">
            <p>
              { error.message }
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
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p>
          Have an account? Login
          <a href="/login" className="ml-1 underline text-lg font-semibold">
            here
          </a>
          .
        </p>

      </form>

      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 blur-sm">
        <img src={backgroundImg} alt=""
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  )
}
 
export default Signup;