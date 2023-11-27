import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center border-x border-dark-gray gap-4">
        <Link to={"/"} className="p-3 text-lg text-slate-300">
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-lg">{currentUser.username}</h1>
          <span className="text-gray-400 text-sm">2 Posts</span>
        </div>
      </div>
      <div className="bg-dark-gray w-100 h-60"></div>
    </div>
  );
};
