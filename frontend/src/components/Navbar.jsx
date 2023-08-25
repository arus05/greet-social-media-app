import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  WrenchScrewdriverIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { useThemeContext } from "../hooks/useThemeContext"
import { useUserContext } from "../hooks/useUserContext"
import { useLogout } from "../hooks/useLogout"

const Navbar = () => {
  const { colorScheme, dispatch: dispatchTheme } = useThemeContext()
  const { user } = useUserContext()
  const { logout } = useLogout()
  const [clickedOnProfile, setClickedOnProfile] = useState(false)
  const profileMenu = useRef(null)
  const [clickedOnBurger, setClickedOnBurger] = useState(false)
  const burger = useRef(null)

  function handleClickOnProfile(e) {
    e.stopPropagation
    setClickedOnProfile(prev => !prev)
  }

  document.addEventListener("mousedown", (e) => {
    if (clickedOnProfile && profileMenu.current && !profileMenu.current.contains(e.target)) {
      setClickedOnProfile(false)
    }
    if (clickedOnBurger && burger.current && !burger.current.contains(e.target)) {
      setClickedOnBurger(false)
    }
  })


  return ( 
    <nav className="
      flex flex-col items-center justify-evenly sticky top-0
      px-10 py-3 gap-6 bg-primary dark:bg-primary-dark sm:flex-row"
    >
      {/* MOBILE MENU */}
      <div
        className=" text-gray-500 md:hidden cursor-pointer shrink-0 
            sm:order-2 self-end sm:self-center relative flex-center
        "
        ref={burger}
      >
        <button
          onClick={() => setClickedOnBurger(prev => !prev)}
          className=""
        >
          <Bars3Icon className="h-6 w-6 text-gray-500" />
        </button>
        {clickedOnBurger &&
          <div className="absolute top-14 right-0 rounded-lg z-20
            p-5 flex flex-col items-start gap-3
            bg-white dark:bg-primary-dark
            text-text dark:text-text-dark
            shadow-xl shadow-gray-300 dark:shadow-none dark:border-dark
          ">
            <div className="flex-center">
              <div
                className="w-12 h-12 rounded-full overflow-hidden shrink-0
                "
              >
                <img
                  src={user.profilePicture}
                  alt="" 
                  className="img-fit"
                />
              </div>
              <div className="rounded-full">
                <button
                  onClick={() => dispatchTheme({ type: "toggleColorScheme" })}
                  className="p-2"
                >
                  {colorScheme === "dark" ?
                    <SunIcon className="h-6 w-6 text-yellow-600" /> : 
                    <MoonIcon className="h-6 w-6 text-blue-900" />}
                </button>
              </div>
            </div>
            <div>
              <p className="whitespace-nowrap text-text-subtle dark:text-text-subtle-dark">@ {user.username}</p>
            </div>
            <ul className="flex flex-col gap-2">
                <li className="">
                  <button className="w-full text-left flex justify-start gap-3" onClick={logout}>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 text-text dark:text-text-dark" />
                    <p className="">
                      Logout
                    </p>
                  </button>
                </li>
              </ul>
          </div>
        }
      </div>
      {/* MOBILE MENU */}
      {/* LOGO */}
      <div className="flex-center justify-between md:block">
        <Link to="/" className="shrink-0 hover:cursor-pointer"> 
          <p className="text-xl font-semibold text-secondary drop-shadow-lg">Greet</p>
        </Link>
      </div>
      {/* LOGO */}
      {/* SEARCH BAR */}
      <div
        className="
          flex-center gap-3 border-2 border-gray-200 rounded-3xl
          px-2 py-1 flex-1 max-w-[350px]
          md:mr-auto 
          dark:bg-search-dark dark:border-primary-dark
        "
      >
        <div>
          <MagnifyingGlassIcon className="h-5 w-5 text-secondary dark:text-text-dark" />
        </div>
        <div className="text-base text-gray-800 dark:text-white grow">
          <input type="text" placeholder="Search"
            className="rounded-md border-gray-300 w-full"
          />
        </div>
      </div>
      {/* SEARCH BAR */}
      {/* NAV BAR */}
      <div className="text-text dark:text-text-dark">
        <ul className="flex-center gap-7 sm:gap-5 text-base justify-evenly">
          <li>
            <Link to="/" className="nav-li">
              <HomeIcon className="nav-icon" />
              <p className="nav-text">Homepage</p>
            </Link> 
          </li>
          <li>
            <a href="#" className="nav-li">
              <UsersIcon className="nav-icon" />
              <p className="nav-text">Connections</p>
            </a> 
          </li>
          <li>
            <a href="#" className="nav-li">
              <ChatBubbleOvalLeftEllipsisIcon className="nav-icon" />
              <p className="nav-text">Messages</p>
            </a> 
          </li>
          <li>
            <a href="#" className="nav-li">
              <BellIcon className="nav-icon" />
              <p className="nav-text">Notifications</p>
            </a> 
          </li>
          <li>
            <a href="#" className="nav-li">
              <WrenchScrewdriverIcon className="nav-icon" />
              <p className="nav-text">Tools</p>
            </a> 
          </li>
        </ul>
      </div>
      {/* NAV BAR */}
      {/* RIGHT SIDE */}
      <div className="hidden md:flex-center gap-3 ml-auto">
        {/* LIGHT/DARK MODE */}
        <div className="rounded-full hover:bg-bg-hover dark:hover:bg-bg-hover-dark">
          <button
            onClick={() => dispatchTheme({ type: "toggleColorScheme" })}
            className="p-2"
          >
            {colorScheme === "dark" ?
              <SunIcon className="h-6 w-6 text-yellow-600" /> : 
              <MoonIcon className="h-6 w-6 text-blue-900" />}
          </button>
        </div>
        {/* LIGHT/DARK MODE */}
        {/* PROFILE */}
        <div ref={profileMenu} onClick={handleClickOnProfile}
          className="relative cursor-pointer"
        >
          <div
            className="w-12 h-12 rounded-full overflow-hidden shrink-0 hover:opacity-70"
          >
            <img
              src={user.profilePicture}
              alt="" 
              className="img-fit"
            />
          </div>
          { clickedOnProfile &&
            <div
                className="absolute py-4 font-semibold top-[60px] right-[0px] text-left z-20
                overflow-hidden w-[200px] rounded-2xl bg-white dark:bg-primary-dark
                text-text dark:text-text-dark
                shadow-xl shadow-gray-300 dark:shadow-none dark:border-dark
            " >
              <ul className="flex flex-col gap-2">
                <li className="profile-nav-li">
                  <button className="w-full text-left flex-center" onClick={logout}>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 ml-3 text-text dark:text-text-dark" />
                    <p className="profile-nav-text flex-grow">
                      Logout
                    </p>
                  </button>
                </li>
                <li className="profile-nav-li">
                    <Link to={`/${user._id}`} className="w-full text-left flex-center">
                      <UserCircleIcon className="h-6 w-6 ml-3 text-gray-500 text-text dark:text-text-dark" />
                      <p className="profile-nav-text flex-grow">
                        Profile
                      </p>
                    </Link>
                </li>
              </ul>
            </div>
          }
        </div>
        {/* PROFILE */}
        {/* USERNAME */}
        <p className="text-text-subtle dark:text-text-subtle-dark text-sm">
          @{user?.username}
        </p>
        {/* USERNAME */}
      </div>
      {/* RIGHT SIDE */}
    </nav>
  );
}
 
export default Navbar;