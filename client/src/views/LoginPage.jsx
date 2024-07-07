import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function LoginPage({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function googleLogin(googleResponse) {
    try {
      
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: { token: googleResponse.credential },
      });

      const encoded = btoa(data.role);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);
      // localStorage.setItem("role", encoded);
      localStorage.setItem("role", data.role);
      navigate("/chat");

    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #000000  , #ff0000)",
        },
        onClick: function () {},
      }).showToast();
    }
  }

  async function handleLogin(e) {
    try {

      e.preventDefault();
      let info = { username, password };
      let { data } = await axios.post(`${url}/login`, info);

      const encoded = btoa(data.role);

      localStorage.setItem(`access_token`, data.access_token);
      localStorage.setItem("username", data.username);
      // localStorage.setItem("role", encoded);
      localStorage.setItem("role", data.role);
      navigate("/chat");

    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #000000  , #ff0000)",
        },
        onClick: function () {},
      }).showToast();
    }
  }

  return (
    <>
      <div className=" flex h-svh w-svw items-center justify-center bg-blue-300">
        <form className="mx-auto max-w-3xl rounded-xl bg-white p-5">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleLogin}>
            Login
          </button>
          <br />
          <div className=" m-5">
            <GoogleLogin onSuccess={googleLogin} />
          </div>
        </form>
      </div>
    </>
  );
}
