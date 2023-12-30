import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "./context/AuthProvider";
import Loader from "./Loader";

import axios from "./api/axios";

const LOGIN_URL = "/register";
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const CreateAdmin = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const nameRef = useRef();
  const errRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [emailField, setEmailField] = useState("");
  const [pwdField, setPwdField] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [pwdCheck, setPwdCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
        JSON.stringify({ name, password, email, roles: ["2005", "2006"] }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data.roles;
      setAuth({ name, password, roles, accessToken });
      console.log(auth);
      setName("");
      setPassword("");
      setEmail("");
      setIsLoading(false);
      setSuccessMsg("User Created Successfully");
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg("Please Check Internet Connection");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Name Or Password or Email");
      } else if (err.response?.status === 409) {
        setErrMsg("An Account already exists with this email");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <div className="bg-gradient-to-tr from-[#8ec5fc] to-[#e0c3fc] w-full min-h-screen grid place-content-center">
      <div className="w-72 h-min bg-[#ffffff74] rounded-lg px-8 py-8 space-y-4">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl text-[#636262]">Register Admin</h1>
          <p
            className={`text-xs ${
              errMsg || emailField || pwdField
                ? "text-red-600"
                : successMsg
                ? "text-green-600"
                : "text-neutral-400"
            }`}
            ref={errRef}
          >
            {pwdField
              ? pwdField
              : emailField
              ? emailField
              : errMsg
              ? errMsg
              : successMsg
              ? successMsg
              : "Please FIl In All Fields"}
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
              className="border-2 border-neutral-500 bg-transparent w-full text-sm py-2 px-3 rounded-md outline-none text-neutral-600"
              placeholder="Enter Full Name"
              id="name"
              required
              onFocus={() => {
                setSuccessMsg("");
                setEmailField("");
                setPwdField("");
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full flex border-2 border-neutral-500 rounded-md">
              <label htmlFor="password" className="sr-only">
                password
              </label>
              <input
                type={visible ? "text" : "password"}
                className=" bg-transparent w-full text-sm py-2 pl-3 outline-none text-neutral-600"
                placeholder="Enter Password"
                id="password"
                value={password}
                required
                onFocus={(e) => {
                  setSuccessMsg("");
                  setEmailField("");
                  setPassword("");
                  setPassword(e.target.value);
                  if (!PASSWORD_REGEX.test(e.target.value)) {
                    setPwdField(
                      "The password must be 4-24 characters long, it must contain a lowercase letter, an uppercase letter and a special character"
                    );
                    setPwdCheck(false);
                  }
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!PASSWORD_REGEX.test(e.target.value)) {
                    setPwdField(
                      "The password must be 4-24 characters long, it must contain a lowercase letter, an uppercase letter and a special character"
                    );
                    setPwdCheck(false);
                  } else {
                    setPwdField("");
                    setPwdCheck(true);
                  }
                }}
              />
              <div className="grid place-content-center px-2 text-slate-600 cursor-pointer">
                {visible ? (
                  <FaEyeSlash onClick={() => setVisible(false)} />
                ) : (
                  <FaEye onClick={() => setVisible(true)} />
                )}
              </div>
            </div>
            <label htmlFor="email" className="sr-only">
              email
            </label>
            <input
              type="text"
              className=" bg-transparent w-full text-sm py-2 pl-3 outline-none text-neutral-600 border-2 border-neutral-500 rounded-md"
              placeholder="yourname@email.com"
              id="email"
              value={email}
              required
              onFocus={(e) => {
                setSuccessMsg("");
                setPwdField("");
                setErrMsg("");
                if (!EMAIL_REGEX.test(e.target.value)) {
                  setEmailField("Invalid Email Adress");
                  setEmailCheck(false);
                }
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!EMAIL_REGEX.test(e.target.value)) {
                  setEmailField("Invalid Email Adress");
                  setEmailCheck(false);
                } else {
                  setEmailField("");
                  setEmailCheck(true);
                }
              }}
            />
          </div>
          <button
            className="w-full bg-[#39a7ff] text-slate-200 text-sm py-2 rounded-md disabled:opacity-60 hover:scale-105 transition-transform"
            type="submit"
            disabled={isLoading || !emailCheck || !pwdCheck || !name.length}
          >
            {isLoading ? (
              <div className=" flex justify-center gap-2">
                <Loader />
                Signing Up
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-neutral-600 text-xs">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-red-600">
            Sign In
          </Link>
        </p>
        <Link to="/" className="text-xs font-light underline text-blue-800">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default CreateAdmin;
