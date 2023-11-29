import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInSuccess,
  signOutUserFailure,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { message } from "antd";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

// firebase storage
// allow read; allow write: if request.resource.size < 2 * 1024* 1024 && request.resource.contentType.matches("image/.*");

export const ProfilePage = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [modalData, setModalData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState("posts");

  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date(currentUser.createdAt);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  async function handleSignOut() {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signOut");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setModalData({ ...modalData, profileImage: downloadURL })
        );
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex border-x border-dark-gray gap-4 justify-between items-center">
        <div className="flex">
          {" "}
          <Link
            to={"/"}
            className="flex items-center p-3 text-lg hover:bg-white/10 "
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-lg font-bold">{currentUser.username}</h1>
            <span className="text-gray-400 text-sm">2 Posts</span>
          </div>
        </div>
        <button
          className="text-white text-2xl p-3  hover:bg-white/10"
          onClick={handleSignOut}
        >
          <MdLogout />
        </button>
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
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={modalData.profileImage || currentUser.profileImage}
            alt="profile image"
            className="w-24 h-24 rounded-full cursor-pointer mx-auto hover:scale-105 hover:grayscale-[50%] transition duration-300"
          />
          <p className="text-center">
            {fileUploadError ? (
              <span className="text-red-700 font-bold">
                Error Image Upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 font-bold">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="flex flex-col gap-4 my-4">
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
          </div>
          <Button
            htmlType="submit"
            type="primary"
            className="bg-blue-600 w-full my-2"
          >
            {loading ? "Editing..." : "Edit"}
          </Button>
          <Button
            htmlType="button"
            type="danger"
            className="bg-red-600 w-full mt-2 text-white hover:opacity-80"
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
