import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useState } from "react";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import Loading from "./Loading";

const UserWidget = ({ user }) => {
  const { user: currentUser, token, dispatch: dispatchUser } = useUserContext()
  const [isAddingRemovingFriend, setIsAddingRemovingFriend] = useState(false)

  async function addRemoveFriend() {
    setIsAddingRemovingFriend(true)
    const res = await fetch(`/api/users/${currentUser._id}/${user._id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if (!res.ok) {
      setIsAddingRemovingFriend(false)
      throw {
        status: "404",
        statusText: "Not Found",
        data: "Failed to add or remove friend"
      }
    }
    dispatchUser({ type: "addRemoveFriend", payload: user._id })
    setIsAddingRemovingFriend(false)
  }

  return (
    <div className="flex-center gap-5 bg-transparent">
      <Link to={`/${user._id}`}>
        <div className="profile-pic-wrapper hover:opacity-70">
          <img  
            className="img-fit"
            src={user.profilePicture}
            alt="profile picture" />
        </div>
      </Link>
      <div>
        <p className="font-medium">
          { user.username }
        </p>
        <p className="text-sm text-text-subtle dark:text-text-subtle-dark">
          { user.location }
        </p>
      </div>
      { currentUser._id !== user._id &&
        <button className="ml-auto" onClick={addRemoveFriend}>
          {
            isAddingRemovingFriend ?
              <Loading /> :
              currentUser.friends.includes(user._id) ?
                <UserMinusIcon className="h-6 w-6 text-secondary hover:opacity-80" /> :
                <UserPlusIcon className="h-6 w-6 text-secondary hover:opacity-80" />
          }
        </button>
      }
    </div>
  );
}
 
export default UserWidget;