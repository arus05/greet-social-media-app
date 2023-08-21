import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <>
      { posts.length > 0 &&
        <div>
          {posts?.map(post => <Post post={post} key={post._id} />)}
        </div>
      }
      {
        posts.length === 0 &&
        <div className="flex-center justify-center text-text dark:text-text-dark">
            <p>No posts available</p>
        </div>
      }
    </>
  );
}
 
export default Posts;