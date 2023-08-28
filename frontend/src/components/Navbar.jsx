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
    <nav className="top-0 z-10 flex flex-col items-center gap-6 px-10 py-6 justify-evenly sm:sticky bg-primary dark:bg-primary-dark sm:flex-row"
    >
      {/* MOBILE MENU */}
      <div
        className="relative self-end text-gray-500 cursor-pointer md:hidden shrink-0 sm:order-2 sm:self-center flex-center"
        ref={burger}
      >
        <button
          onClick={() => setClickedOnBurger(prev => !prev)}
        >
          <Bars3Icon className="w-6 h-6 text-gray-500" />
        </button>
        {clickedOnBurger &&
          <div className="absolute right-0 z-20 flex flex-col items-start gap-3 p-5 bg-white rounded-lg shadow-xl top-14 dark:bg-primary-dark text-text dark:text-text-dark shadow-gray-300 dark:shadow-none dark:border-dark ">
            <div className="flex-center">
              <div
                className="w-12 h-12 overflow-hidden rounded-full shrink-0 "
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
                    <SunIcon className="w-6 h-6 text-yellow-600" /> :
                    <MoonIcon className="w-6 h-6 text-blue-900" />}
                </button>
              </div>
            </div>
            <div>
              <p className="whitespace-nowrap text-text-subtle dark:text-text-subtle-dark">@ {user.username}</p>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="">
                <button className="flex justify-start w-full gap-3 text-left" onClick={logout}>
                  <ArrowLeftOnRectangleIcon className="w-6 h-6 text-text dark:text-text-dark" />
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
      <div className="justify-between flex-center md:block">
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
          <MagnifyingGlassIcon className="w-5 h-5 text-secondary dark:text-text-dark" />
        </div>
        <div className="text-base text-gray-800 dark:text-white grow">
          <input type="text" placeholder="Search"
            className="w-full border-gray-300 rounded-md"
          />
        </div>
      </div>
      {/* SEARCH BAR */}
      {/* NAV BAR */}
      <div className="text-text dark:text-text-dark">
        <ul className="text-base flex-center gap-7 sm:gap-5 justify-evenly">
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
      <div className="hidden gap-3 ml-auto md:flex-center">
        {/* LIGHT/DARK MODE */}
        <div className="rounded-full hover:bg-bg-hover dark:hover:bg-bg-hover-dark">
          <button
            onClick={() => dispatchTheme({ type: "toggleColorScheme" })}
            className="p-2"
          >
            {colorScheme === "dark" ?
              <SunIcon className="w-6 h-6 text-yellow-600" /> :
              <MoonIcon className="w-6 h-6 text-blue-900" />}
          </button>
        </div>
        {/* LIGHT/DARK MODE */}
        {/* PROFILE */}
        <div ref={profileMenu} onClick={handleClickOnProfile}
          className="relative cursor-pointer"
        >
          <div
            className="w-12 h-12 overflow-hidden rounded-full shrink-0 hover:opacity-70"
          >
            <img
              src={user.profilePicture}
              alt=""
              className="img-fit"
            />
          </div>
          {clickedOnProfile &&
            <div
              className="absolute py-4 font-semibold top-[60px] right-[0px] text-left z-20
                overflow-hidden w-[200px] rounded-2xl bg-white dark:bg-primary-dark
                text-text dark:text-text-dark
                shadow-xl shadow-gray-300 dark:shadow-none dark:border-dark
            " >
              <ul className="flex flex-col gap-2">
                <li className="profile-nav-li">
                  <button className="w-full text-left flex-center" onClick={logout}>
                    <ArrowLeftOnRectangleIcon className="w-6 h-6 ml-3 text-text dark:text-text-dark" />
                    <p className="flex-grow profile-nav-text">
                      Logout
                    </p>
                  </button>
                </li>
                <li className="profile-nav-li">
                  <Link to={`/${user._id}`} className="w-full text-left flex-center">
                    <UserCircleIcon className="w-6 h-6 ml-3 text-gray-500 text-text dark:text-text-dark" />
                    <p className="flex-grow profile-nav-text">
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
        <p className="text-sm text-text-subtle dark:text-text-subtle-dark">
          @{user?.username}
        </p>
        {/* USERNAME */}
      </div>
      {/* RIGHT SIDE */}
    </nav>
  );
}

export default Navbar;