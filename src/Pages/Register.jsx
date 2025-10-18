import React, { useContext } from "react";
import SignInForm from "../Components/SignInForm";
import SignUpForm from "../Components/SignUpForm";
import { AppContext } from "../Context/AppContext";
const Register = () => {
  const { register, setRegister } = useContext(AppContext);
  return (
    <section className="w-full max-w-6xl mx-auto flex justify-center items-center flex-col h-[100vh] p-3">
      <div
        className="bg-white flex flex-col justify-center items-center 
      w-full 
      max-w-[400px]  rounded-md shadow-md  "
      >
        <div className="flex gap-4">
          <button
            onClick={() => setRegister("signin")}
            className={` p-2  ${
              register === "signin"
                ? "text-blue-500 font-bold border-b  border-blue-500"
                : "text-gray-500"
            }`}
          >
            SignIn
          </button>

          <button
            onClick={() => setRegister("signup")}
            className={` p-2  ${
              register === "signup"
                ? "text-blue-500 font-bold border-b  border-blue-500"
                : "text-gray-500"
            }`}
          >
            SignUp
          </button>
        </div>
        {register === "signin" ? (
          <>
            <SignInForm setRegister={setRegister} />
          </>
        ) : (
          <>
            <SignUpForm setRegister={setRegister} />
          </>
        )}
      </div>
    </section>
  );
};

export default Register;
