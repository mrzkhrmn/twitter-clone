import { useState } from "react";
import { CreatePost } from "../components/CreatePost";
import { Posts } from "../components/Posts";

export const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <div className="w-full border-b border-gray-700 flex">
        <div
          className="flex flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative justify-center"
          onClick={() => setFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && (
            <div className="w-10 bottom-0 absolute h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className="flex flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative justify-center"
          onClick={() => setFeedType("following")}
        >
          Following
          {feedType === "following" && (
            <div className="w-10 bottom-0 absolute h-1 rounded-full bg-primary"></div>
          )}
        </div>
      </div>
      <CreatePost />
      <Posts />
    </div>
  );
};
