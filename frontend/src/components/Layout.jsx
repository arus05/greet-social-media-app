import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useThemeContext } from "../hooks/useThemeContext";

const Layout = () => {
  const { colorScheme } = useThemeContext()
  return (
    <>
      <Navbar />
      <div className={`min-h-screen overflow-y-auto overflow-x-hidden w-screen
        ${colorScheme === "dark" ? "bg-primary-dark" : "bg-primary"}`}
      >
        <Outlet />
      </div>
    </>
  )
}
 
export default Layout;