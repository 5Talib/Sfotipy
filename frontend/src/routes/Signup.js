import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenicationPOSTRequest } from "../utils/serverHelpers";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
  });
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  //   console.log(user);
  const signup = async () => {
    if (user.password !== user.confirmPassword) {
      alert("Password does not match. Please check again");
      return;
    }
    const { confirmPassword, ...userData } = user;
    // console.log(userData);
    const response = await makeUnauthenicationPOSTRequest(
      "/auth/register",
      userData
    );
    if (response && !response.err) {
      //   console.log(response.data);
      const token = response.data.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      navigate("/");
    } else {
      alert("failure");
    }
  };
  return (
    <div className="w-full min-h-full bg-[#141414] flex flex-col items-center">
      <div className="logo w-full py-8 pl-12 bg-[#141414] flex flex-row items-center gap-1">
        {/*<Icon icon="logos:spotify" width="115"/>*/}
        <Icon
          icon="simple-icons:spotify"
          style={{ color: "white" }}
          width="35"
        />
        <div className="text-white font-semibold text-2xl font-sans tracking-tighter">
          Sfotipy
        </div>
      </div>
      <div className="inputs w-1/4 py-3 flex flex-col items-center justify-center gap-5">
        <div className="text-white font-bold text-4xl mb-8">
          Sign up to start listening
        </div>
        <TextInput
          className={"bg-transparent text-white"}
          label="Email address"
          placeholder="Enter your email"
          name={"email"}
          value={user.email}
          setUser={setUser}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password"
          name={"password"}
          value={user.password}
          setUser={setUser}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter your password again"
          name={"confirmPassword"}
          value={user.confirmPassword}
          setUser={setUser}
        />
        <TextInput
          className={"bg-transparent text-white"}
          label="What should we call you?"
          placeholder="Enter a profile name"
          name={"username"}
          value={user.username}
          setUser={setUser}
        />
        <TextInput
          className={"bg-transparent text-white"}
          label="First Name"
          placeholder="Enter Your First Name"
          name={"firstName"}
          value={user.firstName}
          setUser={setUser}
        />
        <TextInput
          className={"bg-transparent text-white"}
          label="Last Name"
          placeholder="Enter Your Last Name"
          name={"lastName"}
          value={user.lastName}
          setUser={setUser}
        />
        <button
          className="bg-[#1ed760] w-full py-4 rounded-full mt-8 font-bold cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          Sign Up
        </button>
        <div className="border-b border-solid border-gray-500 w-full mt-4"></div>
        <div className="flex flex-row gap-2 mt-4 mb-6">
          <div className="text-gray-500">Already have an account? </div>
          <div className="text-white hover:text-[#1ed760] underline cursor-pointer">
            <Link to="/login">Log in instead</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
