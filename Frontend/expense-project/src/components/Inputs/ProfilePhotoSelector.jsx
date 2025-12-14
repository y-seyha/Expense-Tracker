import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // update the image state
      setImage(file);

      //Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        type="file"
        ref={inputRef}
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload className="text-sm" />
          </button>
        </div>
      ) : (
        <div className="w-20 h-20 relative">
          <img
            src={previewURL}
            alt="profile-picture"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
