import { useEffect, useState } from "react";
import { CreatePost } from "../components/CreatePost";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { Post } from "../components/Post";
import { SignInPage } from "./SignInPage";

export const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchAllTweets() {
      const res = await fetch(`/api/tweets/get-all/${currentUser._id}`);
      const data = await res.json();
      setTweets(data);
    }
    fetchAllTweets();
  }, [currentUser._id]);
  return (
    <>
      {!currentUser ? (
        <SignInPage />
      ) : (
        <>
          <Header />
          <div className="max-w-6xl mx-auto">
            <CreatePost />
          </div>
          <div className="border-b border-dark-gray p-3">
            <div className="flex flex-col flex-1">
              {tweets.map((tweet) => (
                <Post key={tweet._id} tweet={tweet} setTweets={setTweets} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
