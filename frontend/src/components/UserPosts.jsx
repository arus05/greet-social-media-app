import { usePostContext } from "../hooks/usePostContext"
import Post from "./Post";
import Loading from "./Loading";

const UserPosts = ({ user }) => {
  let { posts, loading } = usePostContext()
  posts = posts.filter(post => post.userId === user._id)
  return (
    <>
      { posts.length > 0 && !loading &&
        <div>
          {posts?.map(post => <Post post={post} key={post._id} />)}
        </div>
      }
      {
        posts.length === 0 && !loading &&
        <div className="mt-5 text-center text-text dark:text-text-dark">
            <p>No posts available</p>
        </div>
      }
      {
        loading &&
        <div className="flex-center justify-center">
            <Loading />
        </div>
      }
    </>
  );
}
 
export default UserPosts;