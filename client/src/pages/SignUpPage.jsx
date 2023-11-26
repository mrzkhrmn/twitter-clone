import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { OAuth } from "../components/OAuth";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({});
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-blue-600">Twitter Clone</h1>
        <h1 className="text-3xl">Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="username"
            placeholder="Username..."
            className="border text-lg p-3 rounded-md w-full bg-gray-800 focus:outline-none border-none"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email..."
            className="border text-lg p-3 rounded-md w-full bg-gray-800 focus:outline-none border-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password..."
            className="border text-lg p-3 rounded-md w-full bg-gray-800 focus:outline-none border-none"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white p-3 text-lg rounded-md hover:opacity-80"
        >
          {laoding ? "Signing up.." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <Link to={"/sign-in"} className="text-blue-500 text-lg hover:underline ">
        <p>Already have an account?</p>
      </Link>
      <p className="text-red-600">{error && error}</p>
    </div>
  );
};
