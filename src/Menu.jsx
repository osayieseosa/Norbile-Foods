import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import useWindowWidth from "./Hooks/useWindowWidth";
import AuthContext from "./context/AuthProvider";
import { useContext, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Menu = ({ menu, setMenu }) => {
  const { auth } = useContext(AuthContext);
  const [join, setJoin] = useState(false);
  const [info, setInfo] = useState(false);
  const links = [
    { name: "HOME", to: "/" },
    { name: "PRODUCTS", to: "/shop" },
    { name: "ABOUT", to: "/about" },
  ];
  if (auth?.roles?.find((item) => item === "2006")) {
    links.push({ name: "ADMIN PAGE", to: "/adminPage" });
  }
  const width = useWindowWidth();
  return (
    <div
      className={`${
        width >= 768 ? "w-full" : menu ? "w-full" : "w-0"
      } duration-500 py-7 space-y-24 min-h-screen fixed overscroll-contain overflow-x-hidden z-50 bg-[#000] top-0 md:relative left-0 md:w-max md:py-0 md:h-min md:space-y-0 md:grid md:place-content-center md:bg-transparent`}
    >
      <div
        className="text-yellow-300 relative w-full text-7xl  flex justify-end px-5 md:hidden h-min"
        onClick={() => setMenu(false)}
      >
        <FaTimes className="hover:scale-105 transition-transform cursor-pointer" />
      </div>
      <nav className="w-full text-slate-200">
        <ul className="text-3xl space-y-10 font-bold md:font-semibold w-full grid justify-center md:flex md:text-base md:space-y-0">
          {links.map((link, index) => {
            return (
              <li
                className="w-max relative cursor-pointer border-b-4 border-transparent after:left-0 after:w-0 after:bg-white after:h-1 after:absolute after:top-full hover:after:w-full after:duration-500 md:mx-2"
                key={index}
                onClick={() => setMenu(false)}
              >
                <Link to={link.to}>{link.name}</Link>
              </li>
            );
          })}
          <li>
            <div className="flex gap-3 items-center justify-between md:mr-2">
              INFO{" "}
              <div onClick={() => setInfo((prevState) => !prevState)}>
                {info ? <FaCaretUp /> : <FaCaretDown />}
              </div>
            </div>
            {info && (
              <ul className="md:absolute space-y-5 pt-10 text-2xl ml-5">
                <li>
                  <Link to="https://wa.link/q0hzrb">Contact us</Link>
                </li>
                <li>
                  <Link to="tel:08056765391">Tel</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="flex gap-3 items-center justify-between">
              JOIN US{" "}
              <div onClick={() => setJoin((prevState) => !prevState)}>
                {join ? <FaCaretUp /> : <FaCaretDown />}
              </div>
            </div>
            {join && (
              <ul className="md:absolute space-y-5 pt-10 text-2xl ml-5">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
