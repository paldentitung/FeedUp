import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const SignUpForm = ({ setRegister, currentUser = {}, mode = "signup" }) => {
  const { theme } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUserName] = useState(currentUser.username || "");
  const [fullname, setFullName] = useState(currentUser.fullname || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [status, setStatus] = useState(currentUser.status || "");
  const [avatar, setAvatar] = useState(currentUser.avatar || null);
  const [password, setPassword] = useState(currentUser.password || "");
  const [confirmPassword, setConfirmPassword] = useState(
    currentUser.password || ""
  );

  const navigate = useNavigate();
  const { handleLogIn, toggleModal } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Signup validations
    if (mode === "signup") {
      if (!username || !password || !email) {
        alert("Enter valid info");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      handleLogIn(true, {
        username,
        fullname,
        email,
        bio,
        status,
        avatar,
        password,
      });
      navigate("/");
    }

    // Edit mode: update user info
    if (mode === "edit") {
      handleLogIn(true, {
        ...currentUser,
        username,
        fullname,
        email,
        bio,
        status,
        avatar,
        password, // update password if changed
      });
      alert("Profile updated!");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-2xl mx-auto px-4 py-4 space-y-4 rounded-xl shadow-md transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      <h2
        className={`text-3xl font-bold text-center ${
          theme === "light" ? "text-gray-800" : "text-gray-200"
        }`}
      >
        {mode === "signup" ? "Create Account" : "Edit Profile"}
      </h2>

      {/* Avatar Upload */}
      <div className="flex flex-col md:col-span-2">
        <label
          className={`font-medium ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Profile Picture
        </label>
        <div className="flex justify-around flex-col md:flex-row gap-2">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar Preview"
              className={`mt-2 w-24 h-24 object-cover rounded-full border-2 ${
                theme === "light" ? "border-gray-300" : "border-gray-600"
              }`}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900/30 file:text-blue-400 hover:file:bg-blue-900/50"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Full Name
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
            placeholder="Enter your full name"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
            placeholder="Enter your username"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
            placeholder="Enter your email"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Status / Feeling
          </label>
          <input
            type="text"
            placeholder="Feeling happy 😊"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required={mode === "signup"}
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-10 cursor-pointer transition-colors duration-200 ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-800"
                : "text-gray-400 hover:text-gray-200"
            }`}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col relative">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required={mode === "signup"}
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
            placeholder="Confirm your password"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute right-3 top-10 cursor-pointer transition-colors duration-200 ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-800"
                : "text-gray-400 hover:text-gray-200"
            }`}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        {/* Bio */}
        <div className="flex flex-col md:col-span-2">
          <label
            className={`font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell something about yourself..."
            className={`mt-1 border rounded-lg p-2 focus:outline-none focus:ring-2 resize-none transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
            }`}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
          theme === "light"
            ? "bg-blue-500 text-white hover:bg-blue-600 hover:ring-1 hover:ring-blue-500 hover:ring-offset-white"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:ring-1 hover:ring-blue-400 hover:ring-offset-gray-800"
        }`}
      >
        {mode === "signup" ? "Sign Up" : "Update Profile"}
      </button>

      <div
        className={`text-center mt-3 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setRegister("signin")}
              className={`cursor-pointer hover:underline ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            >
              Sign In
            </span>
          </>
        ) : (
          <span
            onClick={() => {
              console.log("clicked");
              setRegister("signin"); // switch form
              toggleModal(); // close modal
            }}
            className={`cursor-pointer hover:underline ${
              theme === "light" ? "text-blue-600" : "text-blue-400"
            }`}
            aria-label="Cancel and return to sign-in"
          >
            Cancel
          </span>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
