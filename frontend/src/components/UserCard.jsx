import UserWidget from "./UserWidget";

const UserCard = ({ user }) => {
  return ( 
    <div className="w-full p-3 rounded-xl
      shadow-lg shadow-slate-300 dark:shadow-none
      bg-white dark:bg-primary-dark dark:border-dark
      text-text dark:text-text-dark
    ">
      <div className="p-4">
        <UserWidget user={user} />
      </div>
      <hr />
      <div className="p-4">
        <p className="font-light text-text-subtle dark:text-text-subtle-dark mb-2">
          YOUR PAGES
        </p>
      </div>
      <hr />
      <div className="p-4">
        <p className="font-light text-text-subtle dark:text-text-subtle-dark mb-2">
          YOUR PROJECTS
        </p>
        <ul className="font-medium">
          <li>
            <a href="#">
              Github
            </a>
          </li>
          <li>
            <a href="#">
              Apple
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
 
export default UserCard;