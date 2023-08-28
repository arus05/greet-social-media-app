import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="bg-primary dark:bg-primary-dark">
      <Navbar />
      <div className="w-screen min-h-screen overflow-x-hidden overflow-y-auto"
      >
        <Outlet />
      </div>
    </div>
  )
}
 
export default Layout;