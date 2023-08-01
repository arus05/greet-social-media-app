import { useState } from "react";

export default function Form() {
  const [file, setFile] = useState(null)
  
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("picture", file)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button>
        Send
      </button>
    </form>
  )
}