const LightBox = ({ imageURL, setClickedPostImage }) => {

  const toggleLightBox = (e) => {
    if (e.target !== e.currentTarget) return
    setClickedPostImage(null)
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
      onClick={toggleLightBox}
    >
      <img src={imageURL} alt={`post image at: ${imageURL}`} loading="lazy"
        className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px]
          object-cover border-2 border-white"
      />
    </div>
  );
}
 
export default LightBox;