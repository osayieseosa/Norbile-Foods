import React from "react";
import { Link, useNavigate } from "react-router-dom";

const links = [
  { name: "HOME", to: "/" },
  { name: "TEL", to: "tel:08056765391" },
  { name: "ABOUT", to: "/about" },
  { name: "WHATSAPP", to: "https://wa.link/q0hzrb" },
  {
    name: "INSTAGRAM",
    to: "https://www.instagram.com/invites/contact/?i=1t5a9xtrdu2vc&utm_content=t38u7x1 ",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 pt-14 px-5 space-y-10 sm:flex-row ">
      <div className="sm:max-w-2xl sm:m-[0_auto] flex justify-between">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="media/Logo.png"
            alt="footer logo"
            className="w-32 brightness-200"
          />
        </div>
        <div>
          <ul className="text-center text-xs font-semibold text-neutral-200 mb-5">
            {links.map((item) => {
              return (
                <Link to={item.to} key={item.name}>
                  <li className="mb-2">{item.name}</li>
                </Link>
              );
            })}
          </ul>
          <Link
            to="https://wa.link/q0hzrb"
            className="bg-gray-300 text-neutral-800 px-5 py-2 text-sm h-min cursor-pointer rounded-lg font-semibold hover:scale-95"
          >
            CONTACT US
          </Link>
        </div>
      </div>
      <div className="border-t-2 border-neutral-300 py-4 text-neutral-200 w-full flex justify-between px-5 sm:max-w-2xl sm:m-[0_auto] gap-5 text-[8px] sm:text-[14px]">
        <p>&copy;2023 Norbile Foods Inc. All rights reserved</p>
        <p className="cursor-pointer" onClick={() => navigate("/tandc")}>
          Terms Of Service
        </p>
      </div>
    </div>
  );
};

export default Footer;
