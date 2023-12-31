import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "./Hooks/useAuth";
import Loader from "./Loader";

import axios from "./api/axios";

const LOGIN_URL = "/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const nameRef = useRef();
  const errRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name, password, roles: [2005, 2006] }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const roles = response?.data.roles;
      const email = response?.data.email;
      setAuth({ name, roles, email });
      localStorage.setItem("auth", JSON.stringify({ name, roles, email }));
      setName("");
      setPassword("");
      setErrMsg("");
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg("Check Internet Connection");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Name Or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Incorrect Name or Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <div className="bg-gradient-to-tr from-[#8ec5fc] to-[#e0c3fc] w-full min-h-screen grid place-content-center">
      <div className="w-72 h-min bg-[#ffffff74] rounded-lg px-8 py-10 space-y-3">
        <div className="space-y-1">
          <h1 className="font-bold text-4xl text-[#636262]">Login</h1>
          <p
            className={`text-xs ${
              errMsg ? "text-red-600" : "text-neutral-400"
            }`}
            ref={errRef}
          >
            {errMsg ? errMsg : "Please enter your details to sign in"}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              value={name}
              autocomplete
              className="border-2 border-neutral-700 bg-transparent w-full text-sm py-1 px-3 rounded-md outline-none text-neutral-600"
              placeholder="Name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full flex border-2 border-neutral-700 rounded-md">
              <label htmlFor="password" className="sr-only">
                password
              </label>
              <input
                type={visible ? "text" : "password"}
                autocomplete
                className=" bg-transparent w-full text-sm py-1 pl-3 outline-none text-neutral-600"
                placeholder="Password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="grid place-content-center px-2 text-slate-800 cursor-pointer">
                {visible ? (
                  <FaEyeSlash onClick={() => setVisible(false)} />
                ) : (
                  <FaEye onClick={() => setVisible(true)} />
                )}
              </div>
            </div>
          </div>
          <button
            className="w-full bg-[#39a7ff] text-slate-200 text-sm py-2 rounded-md disabled:opacity-60 hover:scale-105 transition-transform"
            type="submit"
            disabled={isLoading || !name || !password}
          >
            {isLoading ? (
              <div className=" flex justify-center gap-2">
                <Loader />
                Signing In
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="text-neutral-600 text-xs">
          Dont have an account?{" "}
          <Link to="/signup" className="font-bold text-red-600">
            Sign Up
          </Link>
        </p>
        <Link to="/" className="text-xs font-light underline text-blue-800">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
