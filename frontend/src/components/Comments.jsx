import Comment from "./Comment";

const Comments = ({ comments }) => {

  return ( 
    <div className="w-full mt-2">
      {
        comments.length > 0 ?
        comments.map(comment => (
          <Comment comment={comment} key={comment._id} />
        )) :
        <p className="text-text-subtle dark:text-text-subtle-dark"> No comments </p>
      }
    </div>
  );
}

export default Comments;