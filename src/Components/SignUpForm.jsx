import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const SignUpForm = ({ setRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigator = useNavigate();
  const { handleLogIn } = useContext(AppContext);

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

    // Pass all user info to context
    handleLogIn(true, {
      username,
      fullname,
      email,
      bio,
      status,
      avatar,
      password,
    });

    navigator("/");
  };

  return (
    <form className="bg-white w-full  mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center mb-6">Sign Up</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Status / Feeling */}
        <div className="flex flex-col gap-1">
          <label htmlFor="status">Status / Feeling</label>
          <input
            type="text"
            placeholder="Feeling happy 😊"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
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

        {/* Avatar Upload */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="avatar">Profile Picture</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 cursor-pointer"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell something about yourself..."
            className="border border-gray-400 p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 resize-none"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 p-2 text-white rounded-sm shadow-md hover:opacity-75 w-full"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-gray-500 mt-2">
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
