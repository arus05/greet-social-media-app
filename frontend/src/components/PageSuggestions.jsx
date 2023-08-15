import { useSuggestionContext } from "../hooks/useSuggestionContext";
import UserWidget from "./UserWidget";

const PageSuggestions = () => {
  const { pageSuggestions } = useSuggestionContext()
  return ( 
    <div className=" p-5 rounded-2xl
      shadow-lg shadow-slate-300 dark:shadow-none
      bg-white dark:bg-primary-dark dark:border-dark
      text-text dark:text-text-dark">
      <p className="font-medium text-lg mb-4">
        Popular pages and projects
      </p>
      <div className="flex flex-col gap-4">
        {
          pageSuggestions.map(user => (
            <UserWidget user={user} key={user._id} />
          ))
        }
      </div>
    </div>
  );
}
 
export default PageSuggestions;