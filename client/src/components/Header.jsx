import { FaSearch, FaHome, FaUser, FaPen } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="max-w-6xl  mx-auto">
      <div className="flex items-center justify-between p-3 border-b border-gray-600">
        <h1 className="text-2xl text-white font-semibold">Twitter-Clone</h1>
        <form>
          <div className="relative flex items-center text-gray-200 focus-within:text-white ">
            <input
              placeholder={"Search..."}
              id="search"
              autoComplete="off"
              className="py-2 pr-3 pl-10 rounded-md w-60 sm:w-80 bg-neutral-700 focus:outline-none border-none focus:ring-2 focus:ring-gray-700 focus:placeholder-gray-300"
            />
            <button className="w-5 h-5 absolute ml-3 pointer-events-none">
              <FaSearch />
            </button>
          </div>
        </form>
        <div className="flex gap-4 items-center text-xl">
          <NavLink to={"/"} className="flex items-center gap-1">
            <FaHome /> <span>Home</span>
          </NavLink>
          <NavLink to={"/about"} className="flex items-center gap-1">
            <FaPen /> <span>About</span>
          </NavLink>
          <NavLink to={"/profile"} className="flex items-center gap-1">
            <FaUser />{" "}
            <span>{currentUser ? currentUser.username : "Profile"}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
