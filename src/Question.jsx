import React, { useContext } from "react";
import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import AppContext from "./context/AppProvider";

const Question = () => {
  const navigate = useNavigate();
  const { setLocation, location, delivery } = useContext(AppContext);
  return (
    <div>
      <EcommerceHeader />
      <div className="w-full h-[calc(100vh_-_210px)] grid place-content-center">
        <div className="border-2 border-neutral-500 w-64 h-52 rounded-md grid px-4 bg-[#ffffff7a] py-7">
          <div className="space-y-3">
            <div className="text-2xl font-bold text-center text-neutral-700 italic">
              Norbile foods
            </div>
            <p className="text-sm text-neutral-500">
              Please Select a location to continue the process
            </p>
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <select
              id="location"
              onChange={(e) => {
                setLocation(e.target.value);
                navigate("/location");
              }}
              className="focus:outline-none border-b-2 border-neutral-500 p-2 text-neutral-500 text-sm font-bold cursor-pointer"
            >
              <option value={location}>{location.toUpperCase()} LGA</option>
              {delivery.map((item) => {
                return (
                  <option value={item.location} key={item.name}>
                    {item.location.toUpperCase()} LGA
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
