import { useSelector } from "react-redux";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [active, setActive] = useState("posts");
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
            <button className="border border-slate-500 rounded-full py-1 px-5 hover:bg-white/10">
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
              active === "posts" ? "active" : ""
            }`}
            id="posts"
            onClick={(e) => setActive(e.target.id)}
          >
            Posts
          </button>
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "replies" ? "active" : ""
            }`}
            id="replies"
            onClick={(e) => setActive(e.target.id)}
          >
            Replies
          </button>
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "highlights" ? "active" : ""
            }`}
            id="highlights"
            onClick={(e) => setActive(e.target.id)}
          >
            Highlights
          </button>
          <button
            className={`py-6 px-11 opacity-70 hover:bg-white/10 transition duration-200 ${
              active === "media" ? "active" : ""
            }`}
            id="media"
            onClick={(e) => setActive(e.target.id)}
          >
            Media
          </button>
          <button
            className={`py-6 px-10 opacity-70 hover:bg-white/10 transition duration-300 ${
              active === "likes" ? "active" : ""
            }`}
            id="likes"
            onClick={(e) => setActive(e.target.id)}
          >
            Likes
          </button>
        </div>
      </div>
      <div>Posts</div>
    </div>
  );
};
