import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="bg-primary dark:bg-primary-dark pt-3">
      <Navbar />
      <div className="min-h-screen overflow-y-auto overflow-x-hidden w-screen"
      >
        <Outlet />
      </div>
    </div>
  )
}
 
export default Layout;