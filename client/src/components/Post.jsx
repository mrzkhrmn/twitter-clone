import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { message } from "antd";

export const Post = ({ tweet, setTweets }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});
  const date = new Date();
  const postCreateDate = tweet.createdAt.slice(8, 10);

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

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`/api/user/get/${tweet.userId}`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [tweet.userId, tweet.likes]);

  async function handleLike(e) {
    e.preventDefault();
    try {
      await fetch(`/api/tweets/like/${tweet._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentUser._id }),
      });
      const newData = await fetch(`/api/tweets/get-all/${currentUser._id}`, {
        method: "GET",
      });
      const data = await newData.json();
      setTweets(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await fetch(`/api/tweets/delete/${tweet._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentUser._id }),
      });
      const newData = await fetch(`/api/tweets/get-all/${currentUser._id}`, {
        method: "GET",
      });
      const data = await newData.json();
      setTweets(data);
      message.success("Tweet has been deleted!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-between  gap-4 border-b border-dark-gray p-3">
      <div className="flex gap-2">
        <Link to={"/profile/" + userData._id}>
          <img
            className="w-14"
            src={userData.profileImage}
            alt="profileImage"
          />
        </Link>
        <div>
          <div className="flex flex-col flex-1">
            <p className="font-semibold">
              {userData.username} -{" "}
              <span className="opacity-40">
                {getMonthToString(date.getMonth())} {Number(postCreateDate) + 1}
              </span>
            </p>
            <p className="my-2">{tweet.description}</p>
            <div className="flex items-center gap-1">
              <button type="button" onClick={handleLike} className=" text-xl">
                {tweet.likes.includes(currentUser._id) ? (
                  <MdOutlineFavorite />
                ) : (
                  <MdFavoriteBorder />
                )}
              </button>
              <span className="opacity-50">{tweet.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className="text-lg text-red-700 p-1 rounded-full hover:bg-white/10"
        >
          {tweet.userId === currentUser._id && <FaRegTrashAlt />}
        </button>
      </div>
    </div>
  );
};
