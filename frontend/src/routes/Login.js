import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { makeUnauthenicationPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    // console.log(user);
    const response = await makeUnauthenicationPOSTRequest("/auth/login", user);
    if (response && !response.err) {
      //   console.log(response.data);
      const token = response.data.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      navigate("/home");
    } else {
      alert("failure");
    }
  };

  return (
    <div className="w-full min-h-full bg-[#2c2b2b] flex flex-col gap-8 items-center">
      <div className="logo w-full py-8 pl-12 bg-[#141414] flex flex-row items-center gap-1">
        {/*<Icon icon="logos:spotify" width="115"/>*/}
        <Icon
          icon="simple-icons:spotify"
          style={{ color: "white" }}
          width="35"
        />
        <div className="text-white font-semibold text-2xl font-sans tracking-tighter">
          Spotify
        </div>
      </div>
      <div class="w-1/2 bg-[#141414] rounded-lg flex flex-col items-center">
        <div className="inputs w-1/2 py-16 flex flex-col items-center justify-center gap-5">
          <div className="text-white font-bold text-4xl mb-12">
            Log in to Spotify
          </div>
          <TextInput
            className={"text-white bg-transparent"}
            label="Email or username"
            placeholder="Email or username"
            name={"email"}
            value={user.email}
            setUser={setUser}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            name={"password"}
            value={user.password}
            setUser={setUser}
          />
          <button
            className="bg-[#1ed760] w-full py-4 rounded-full mt-8 font-bold"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Log In
          </button>
          <div className="border-b border-solid border-gray-500 w-full mt-4"></div>
          <div className="flex flex-row gap-2 mt-4">
            <div className="text-gray-500">Don't have an account? </div>
            <div className="text-white hover:text-[#1ed760] underline cursor-pointer">
              <Link to="/signup">Sign up for Spotify</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
