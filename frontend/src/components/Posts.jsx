import { usePostContext } from "../hooks/usePostContext"
import Post from "./Post";
import Loading from "./Loading";

const Posts = () => {
  const { posts } = usePostContext()
  return (
    <>
      { posts && posts.length > 0 &&
        <div>
          {posts?.map(post => <Post post={post} key={post._id} />)}
        </div>
      }
      {
        posts && posts.length === 0 &&
        <div className="text-text dark:text-text-dark">
            <p>No posts available</p>
        </div>
      }
      {
        !posts &&
        <div className="flex-center justify-center">
          <Loading />
        </div>
      }
    </>
  );
}
 
export default Posts;