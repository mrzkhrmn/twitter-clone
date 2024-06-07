import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../../features/api/authApiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../../features/user/userSlice";

export const Sidebar = () => {
  const [logout, { isError, error }] = useLogoutMutation();

  const dispatch = useDispatch();

  const { data } = useGetUserQuery();

  async function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutStart());
    try {
      await logout().unwrap();
      if (isError)
        throw new Error(
          error?.data || "Something went wrong while logging out"
        );
      dispatch(logoutSuccess());
      toast.success("Logged out successfully!");
    } catch (err) {
      dispatch(logoutFailure(err.message));
      console.log(err.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52 ">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to={"/"} className="flex justify-center md:justify-start">
          <XSvg className="fill-white w-12 h-12 px-2 hover:bg-stone-900 rounded-full" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to={"/"}
              className="py-2 pl-2 pr-4 flex gap-3 items-center transition-all duration-300 hover:bg-stone-900 rounded-full max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={"/notifications"}
              className="py-2 pl-2 pr-4 flex gap-3 items-center transition-all duration-300 hover:bg-stone-900 rounded-full max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-8 h-8" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${data?.username}`}
              className="py-2 pl-2 pr-4 flex gap-3 items-center transition-all duration-300 hover:bg-stone-900 rounded-full max-w-fit cursor-pointer"
            >
              <FaUser className="w-8 h-8" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {data && (
          <Link
            to={`/profile/${data?.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={data?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {data?.fullName}
                </p>
                <p className="text-slate-500 text-sm">@{data?.username}</p>
              </div>
              <BiLogOut
                onClick={handleLogout}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
