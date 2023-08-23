import Post from "./Post";
import LightBox from "./Lightbox";
import { useState } from "react";

const Posts = ({ posts }) => {
  const [clickedPostImage, setClickedPostImage] = useState(null)
  return (
    <>
      { posts.length > 0 &&
        <div>
          {posts?.map(post => (
            <Post
              post={post}
              key={post._id}
              setClickedPostImage={setClickedPostImage}
            />
          ))}
        </div>
      }
      {
        posts.length === 0 &&
        <div className="flex-center justify-center text-text dark:text-text-dark">
            <p>No posts available</p>
        </div>
      }
      {
        clickedPostImage &&
        <LightBox
          imageURL={clickedPostImage}
          setClickedPostImage={setClickedPostImage}
        />
      }
    </>
  );
}
 
export default Posts;