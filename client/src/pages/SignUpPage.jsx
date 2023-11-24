import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export const SignUpPage = () => {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-blue-600">Twitter Clone</h1>
        <h1 className="text-3xl">Sign Up</h1>
      </div>
      <form className="flex flex-col gap-4 my-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="username"
            placeholder="Username..."
            className="border text-lg p-3 rounded-md w-full"
            required
          />
          <input
            type="text"
            id="email"
            placeholder="Email..."
            className="border text-lg p-3 rounded-md w-full"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password..."
            className="border text-lg p-3 rounded-md w-full"
            required
          />
        </div>
        <button className="bg-slate-700 text-white p-3 text-lg rounded-md">
          Sign Up
        </button>
        <button className="bg-red-700 text-white p-3 text-lg rounded-md flex items-center justify-center gap-2">
          <span>Sign up with</span>{" "}
          <span className="flex items-center">
            <FaGoogle />
            oogle
          </span>
        </button>
      </form>
      <Link to={"/sign-in"} className="text-blue-700 text-lg hover:underline">
        <p>Already have an account?</p>
      </Link>
    </div>
  );
};
