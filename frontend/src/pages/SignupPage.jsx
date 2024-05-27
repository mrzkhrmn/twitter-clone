import {
  MdOutlineEmail,
  MdDriveFileRenameOutline,
  MdOutlinePassword,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

import XSvg from "../components/svgs/X";
import { Link } from "react-router-dom";
import { useState } from "react";

export const SignupPage = () => {
  const [formData, setFormData] = useState({});

  const isError = false;
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="h-screen flex max-w-screen-xl mx-auto px-10 gap-8">
      <div className="flex-1 lg:flex items-center justify-center hidden">
        <XSvg className="fill-white lg: w-96" />
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className=" w-full mx-auto md:mx-20 flex flex-col gap-4"
        >
          <XSvg className="w-24 lg:hidden fill-white self-center" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered flex items-center gap-2">
            <MdOutlineEmail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <MdDriveFileRenameOutline />
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              id="fullName"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <MdOutlinePassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              id="password"
              autoComplete="off"
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary text-white rounded-full mt-8">
            Sign Up
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white font-thin text-center">
            Already have an account?
          </p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
