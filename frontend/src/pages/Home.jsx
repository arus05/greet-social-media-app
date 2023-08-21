import { useNavigation } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { usePostContext } from "../hooks/usePostContext";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import UserSuggestions from "../components/UserSuggestions";
import PageSuggestions from "../components/PageSuggestions";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Home = () => {
  const navigation = useNavigation()
  const { user } = useUserContext()
  const { posts, loading: postsLoading } = usePostContext()

  if (navigation.state === "loading" || postsLoading) {
    return (
      <div className="mt-10 flex-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
      <main
        className="
          py-3 px-5 grid place-content-evenly gap-7
          grid-cols-[minmax(0,500px)] 
          md:grid-cols-[475px,minmax(0px,350px)]
          lg:grid-cols-[minmax(0,350px),550px,minmax(150px,350px)]
          xl:grid-cols-[minmax(0,350px),650px,minmax(0,350px)]
      ">
        {/* LEFT */}
        <div className="w-full hidden lg:block">
          <UserCard user={user} />
          <Footer />
        </div>

        {/* MIDDLE */}
        <div className="w-full">
          <CreatePost />
        <Posts posts={posts} />
        </div>

        {/* RIGHT */}
        <div className="w-full hidden md:block">
          <UserSuggestions />
          <PageSuggestions />
        </div>
      </main>
  );
}
 
export default Home;