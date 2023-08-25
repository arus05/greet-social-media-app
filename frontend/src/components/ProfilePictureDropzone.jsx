import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";

const MAX_FILE_SIZE_IN_MB = 5
const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB*1024*1024

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const ProfilePictureDropzone = ({ profilePicture, setProfilePicture }) => {
  const onDrop = useCallback(acceptedFiles => {
    setProfilePicture(acceptedFiles[0])
    console.log(acceptedFiles[0])
  }, [setProfilePicture])
  const maxFiles = 1
  const accept = {
    'image/jpeg': [],
    'image/png': []
  }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone({ onDrop, maxFiles, accept, maxSize:MAX_FILE_SIZE })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div {...getRootProps({style})} className="input-container border-dashed bg-transparent">
      <input {...getInputProps()} />
      {profilePicture ?
        <div className="flex-center gap-3">
          <p>{profilePicture.name}</p>
          <button onClick={(e) => {
            e.stopPropagation()
            setProfilePicture(null)
          }}>
            <XMarkIcon className="h-6 w-6 text-red-500 hover:scale-110 hover:drop-shadow-lg shadow-gray-400 cursor-pointer" />
          </button>
        </div> :
        <p>Drag and drop your profile picture here, or click to select files (MAX {MAX_FILE_SIZE_IN_MB} MB)</p>
      }
    </div>
  );
}
 
export default ProfilePictureDropzone;