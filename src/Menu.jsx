import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import useWindowWidth from "./Hooks/useWindowWidth";
import AuthContext from "./context/AuthProvider";
import { useContext } from "react";

const Menu = ({ menu, setMenu }) => {
  const { auth } = useContext(AuthContext);
  const links = [
    { name: "HOME", to: "/" },
    { name: "PRODUCTS", to: "/shop" },
    { name: "CONTACT US", to: "https://wa.link/q0hzrb" },
    { name: "TEL", to: "tel:08056765391" },
    { name: "ABOUT", to: "/about" },
    { name: "Login", to: "/login" },
    { name: "Sign Up", to: "/signup" },
  ];
  if (auth?.roles?.find((item) => item === "2006")) {
    links.push({ name: "ADMIN PAGE", to: "/adminPage" });
  }
  const width = useWindowWidth();
  return (
    <div
      className={`${
        width >= 768 ? "w-full" : menu ? "w-full" : "w-0"
      } duration-500 fixed min-h-full py-7 space-y-24 overscroll-contain overflow-x-hidden z-50 bg-[#000] top-0 md:relative left-0 md:w-max md:py-0 md:h-min md:space-y-0 md:grid md:place-content-center md:bg-transparent`}
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
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
