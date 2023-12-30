import React, { useContext } from "react";
import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import AppContext from "./context/AppProvider";
import Button from "./Button";

const Location = () => {
  const navigate = useNavigate();
  const { setAddress, address, tel, setTel } = useContext(AppContext);
  return (
    <div>
      <EcommerceHeader />
      <div className="w-full h-[calc(100vh_-_210px)] grid place-content-center">
        <div className="border-2 border-neutral-500 w-64 h-80 rounded-md grid px-4 bg-[#ffffff7a] pt-7">
          <div className="space-y-3">
            <div className="text-2xl font-bold text-center text-neutral-700 italic">
              Norbile foods
            </div>
            <p className="text-xs text-neutral-500">
              Kindly complete the provided fields to facilitate easier
              comunication with you.
            </p>
            <form className="space-y-4" onSubmit={() => navigate("/Checkout")}>
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                type="text"
                required
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border-b-2 border-neutral-500 w-full text-xs px-5 py-2 outline-none placeholder:text-neutral-500 text-neutral-500 font-bold"
              />
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                type="tel"
                placeholder="eg: 08071237654"
                required
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="border-b-2 border-neutral-500 w-full text-xs px-5 py-2 outline-none placeholder:text-neutral-500 text-neutral-500 font-bold"
              />
              <button type="submit" className="w-min text-slate-200">
                <Button content="Next" size="text-xs" px="px-5" py="py-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Location;
