import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const SignInForm = ({ setRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const { handleLogIn } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("enter valid info");
      return;
    }
    handleLogIn(true);
    navigator("/");
  };

  return (
    <form
      className="flex flex-col gap-5 bg-white w-full max-w-[400px]  p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">Sign In</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="user"
          onChange={(e) => setUserName(e.target.value)}
          required
          className="border-gray-400 border p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="border-gray-400 border p-2 rounded-md outline-0 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-10 cursor-pointer text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <>
              <AiOutlineEyeInvisible size={20} />
            </>
          ) : (
            <>
              <AiOutlineEye size={20} />
            </>
          )}
        </div>
      </div>
      <button className="bg-blue-500 p-2 text-white rounded-sm shadow-md hover:opacity-75">
        Sign In
      </button>
      <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <span
          onClick={() => setRegister("signup")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default SignInForm;
