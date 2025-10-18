import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const SignUpForm = ({ setRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigator = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert("enter valid info");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    navigator("/");
  };
  return (
    <form
      className="flex flex-col gap-3 bg-white w-full max-w-[400px] p-6 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>

      {/* Username */}
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-10 cursor-pointer text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </span>
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={6}
          required
          className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full"
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-10 cursor-pointer text-gray-600 hover:text-gray-800"
        >
          {showConfirmPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </span>
      </div>

      <button
        type="submit"
        className="bg-blue-500 p-2 text-white rounded-sm shadow-md hover:opacity-75"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <span
          onClick={() => setRegister("signin")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
