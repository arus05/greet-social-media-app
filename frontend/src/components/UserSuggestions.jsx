import { useSuggestionContext } from "../hooks/useSuggestionContext"
import UserWidget from "../components/UserWidget";

const UserSuggestions = () => {
  const { userSuggestions } = useSuggestionContext()
  return ( 
    <div className=" p-5 rounded-2xl mb-8
      shadow-lg shadow-slate-300 dark:shadow-none
      bg-white dark:bg-primary-dark dark:border-dark
      text-text dark:text-text-dark">
      <p className="font-medium text-lg mb-4">Suggestions for you</p>
      <div className="flex flex-col gap-4">
        {
          userSuggestions.map(user => (
            <UserWidget user={user} key={user._id} />
          ))
        }
      </div>
    </div>
  );
}
 
export default UserSuggestions;