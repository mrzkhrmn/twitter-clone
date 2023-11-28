import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { message } from "antd";

export const ProfilePage = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [modalData, setModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState("posts");
  const dispatch = useDispatch();

  const date = new Date(currentUser.createdAt);

  const getMonthToString = (month) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";

      default:
        break;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleChange(e) {
    setModalData({ ...modalData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      handleCancel();
      message.success("User updated successfully");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  async function handleDeleteUser() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
      message.success("Your account has been deleted!");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex border-x border-dark-gray gap-4">
        <Link
          to={"/"}
          className="flex items-center p-3 text-lg text-slate-300  hover:bg-white/5 "
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-lg font-bold">{currentUser.username}</h1>
          <span className="text-gray-400 text-sm">2 Posts</span>
        </div>
      </div>
      <div className="bg-dark-gray w-100 h-60"></div>
      <div className="border-x border-b border-dark-gray">
        <div className="relative">
          <img
            src={currentUser.profileImage}
            alt="profile image"
            className="rounded-full absolute -bottom-1.5 left-6 w-32 border-4 border-black"
          />
          <div className="flex justify-end p-3 text-lg font-semibold">
            <button
              onClick={showModal}
              className="border border-slate-500 rounded-full py-1 px-5 hover:bg-white/10"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-8 px-4">
          <h1 className="text-xl font-bold">{currentUser.username}</h1>
          <div>
            <p className="flex items-center gap-2 opacity-40 mt-6">
              <FaCalendar />{" "}
              <span>
                Joined {getMonthToString(date.getMonth())} {date.getFullYear()}
              </span>
            </p>
            <div className="flex gap-3 mt-2">
              <p>
                <span className="text-slate-200">22</span>{" "}
                <span className="opacity-50">Following</span>
              </p>
              <p>
                <span className="text-slate-200">0</span>{" "}
                <span className="opacity-50">Followers</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "posts" ? "activeBtn" : ""
            }`}
            id="posts"
            onClick={(e) => setActive(e.target.id)}
          >
            Posts
          </button>
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "replies" ? "activeBtn" : ""
            }`}
            id="replies"
            onClick={(e) => setActive(e.target.id)}
          >
            Replies
          </button>
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "highlights" ? "activeBtn" : ""
            }`}
            id="highlights"
            onClick={(e) => setActive(e.target.id)}
          >
            Highlights
          </button>
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "media" ? "activeBtn" : ""
            }`}
            id="media"
            onClick={(e) => setActive(e.target.id)}
          >
            Media
          </button>
          <button
            className={`py-6 px-10 opacity-70 hover:bg-white/10 transition duration-300 ${
              active === "likes" ? "activeBtn" : ""
            }`}
            id="likes"
            onClick={(e) => setActive(e.target.id)}
          >
            Likes
          </button>
        </div>
      </div>
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <form onSubmit={handleSubmit}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
            alt="user image"
            className="w-24 h-24 object-cover rounded-full cursor-pointer mx-auto"
          />
          <form className="flex flex-col gap-4 my-4">
            <input
              type="text"
              id="username"
              placeholder="Username..."
              defaultValue={currentUser.username}
              className="border p-3 outline-none rounded-lg"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              id="email"
              placeholder="Email..."
              defaultValue={currentUser.email}
              className="border p-3 outline-none rounded-lg"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              id="password"
              placeholder="Password..."
              className="border p-3 outline-none rounded-lg"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </form>
          <Button
            htmlType="submit"
            type="primary"
            className="bg-blue-600 w-full my-2"
          >
            {loading ? "Editing..." : "Edit"}
          </Button>
          <Button
            htmlType="button"
            className="bg-red-600 w-full mt-2"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
          <p className="text-red-700">{error && error}</p>
        </form>
      </Modal>
    </div>
  );
};
