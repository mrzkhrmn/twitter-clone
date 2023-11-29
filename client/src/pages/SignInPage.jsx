import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { OAuth } from "../components/OAuth";

export const SignInPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-blue-600">
          Twitter <span className="text-white">Clone</span>
        </h1>
        <h1 className="text-3xl">Sign In</h1>
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          alt="user image"
          className="w-24 h-24 object-cover rounded-full cursor-pointer"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
        <div className="flex flex-col gap-2 ">
          <input
            type="email"
            id="email"
            placeholder="Email..."
            autoComplete="off"
            className="border text-lg p-3 rounded-md w-full bg-gray-800 focus:outline-none border-none"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password..."
            className="border text-lg p-3 rounded-md w-full bg-gray-800 focus:outline-none border-none"
            required
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white p-3 text-lg rounded-md hover:opacity-80"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <Link to={"/sign-up"} className="text-blue-500 text-lg hover:underline">
        <p>Dont have an account?</p>
      </Link>
      <p className="text-red-600">{error && error}</p>
    </div>
  );
};
