import { message } from "antd";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { useSelector } from "react-redux";

export const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  function handleResetForm() {
    setFormData({ formData: {} });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("workkk");
    try {
      const res = await fetch(`/api/tweets/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id, ...formData }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      handleResetForm();
      message.success("Tweet created!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center gap-4 mt-8">
      <div>
        <img
          className="w-12 rounded-full object-cover"
          src={currentUser?.profileImage}
          alt="profile ia-mage"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          className=" text-lg bg-transparent focus:outline-none p-3 rounded-md border-b border-gray-600 focus:placeholder-gray-300"
          placeholder="What is happening?!"
          name="description"
          id="description"
          cols="100"
          rows="5"
          maxLength={200}
          onChange={(e) => handleChange(e)}
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
