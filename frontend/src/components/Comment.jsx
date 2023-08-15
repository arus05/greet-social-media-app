const Comment = ({ comment }) => {
  return (
    <>
      <div className="w-5/6 bg-hover dark:bg-hover-dark mb-2 px-2 py-1">
        <p className="font-medium break-words">
          {`@${comment.username} : ${comment.body}`}
        </p>
      </div>
      <hr className="mx-2 w-5/6 mb-3 border-[1px] border-gray-200 dark:border-gray-100" />
    </>
  );
}
 
export default Comment;