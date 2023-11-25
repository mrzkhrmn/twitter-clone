import { useRef } from "react";
import { FaImage } from "react-icons/fa";

export const CreatePost = () => {
  const fileRef = useRef(null);
  return (
    <div className="flex justify-center gap-4 mt-8">
      <div>
        <img
          className="w-12"
          src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          alt="profile ia-mage"
        />
      </div>
      <form className="flex flex-col">
        <textarea
          className=" text-lg bg-transparent focus:outline-none p-3 rounded-md border-b border-gray-600 focus:placeholder-gray-300"
          placeholder="What is happening?!"
          name="post"
          id="post"
          cols="100"
          rows="5"
        ></textarea>
        <div className="flex justify-between p-2">
          <input type="file" accept="image/*" ref={fileRef} hidden />
          <p
            onClick={() => fileRef.current.click()}
            className="cursor-pointer flex items-center gap-2 hover:text-gray-300"
          >
            <span>Add image</span> <FaImage />
          </p>
          <button
            type="submit"
            className="bg-blue-500 py-2 px-6 rounded-lg text-md font-semibold hover:opacity-90"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
