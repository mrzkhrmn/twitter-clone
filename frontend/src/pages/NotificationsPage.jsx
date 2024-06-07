import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

export const NotificationsPage = () => {
  const isLoading = false;
  const notifications = [
    {
      _id: "1",
      from: {
        _id: "1",
        username: "johndoe",
        profileImg: "/avatars/boy2.png",
      },
      type: "follow",
    },
    {
      _id: "2",
      from: {
        _id: "2",
        username: "janedoe",
        profileImg: "/avatars/girl1.png",
      },
      type: "like",
    },
  ];

  const deleteNotifications = () => {
    alert("All notifications deleted");
  };

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
      <div className="border-b border-gray-700">
        <div className="flex items-center justify-between p-3">
          <h1 className="font-bold">Notifications</h1>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="p-1 rounded-full hover:bg-gray-700 tranisiton duration-300 cursor-pointer"
            >
              <IoSettingsOutline className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="justify-center items-center flex h-full">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {notifications.length === 0 && (
        <div className="text-center font-bold mt-20">No notifications yet.</div>
      )}
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className="flex items-center border-b border-gray-700 gap-2 p-3"
        >
          <div className="self-start mt-1 text-2xl">
            {notification.type === "follow" ? (
              <FaUser className="text-blue-500" />
            ) : (
              <FaHeart className="text-red-500" />
            )}
          </div>
          <div>
            <img
              src={notification.from.profileImg}
              alt="porileImg"
              className="w-8 h-8"
            />
            <p>
              <span className="font-bold">@{notification.from.username}</span>{" "}
              {notification.type === "follow"
                ? "followed you."
                : "liked your post."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
