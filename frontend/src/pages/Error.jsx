import backgroundImg from "../assets/loginPageBG.jpg"
import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError() || {
    status: 404,
    statusText: "Not Found",
    data: "An error occurred while loading this page"
  }
  console.log(error)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-[800px]  max-w-[80%] bg-white bg-opacity-70 px-16 py-10 rounded-xl flex-center flex-col gap-9">
        <p className="text-5xl text-center font-bold">
          {`${error.status} ${error.statusText}`}
        </p>
        <p className="text-lg">
          {error?.data}
        </p>
        <div className="flex-center">
          <button className="btn px-3 py-2 rounded-lg text-white">
            <Link to="/">
              Go To Home Page
            </Link>
          </button>
        </div>
      </div>
      <div className="absolute w-full h-full top-0 left-0 -z-10 blur-sm">
        <img src={backgroundImg} alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
 
export default NotFound;