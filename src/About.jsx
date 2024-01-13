import React from "react";
import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";
import about from "./images/about.webp";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <EcommerceHeader />
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover"
          src={about}
          alt="About header"
        />
      </div>
      <div className="w-full px-5 py-14 max-w-[70ch] sm:m-[0_auto]">
        <h1 className="font-bold text-3xl text-neutral-800 mb-10">
          About Norbile Foods
        </h1>
        <h3 className="text-neutral-600 font-bold text-xl mb-4 ml-2">
          Summary
        </h3>
        <p className="text-neutral-600 ml-5">
          We sell food at cheap and affordable prices to any location of your
          choice, we do door to door delivery, we are easy to work with, our
          primary focus is fast food and we prioritize our customers
          satisfaction
        </p>
        <h3 className="text-neutral-600 font-bold text-xl mt-10 mb-4 ml-2">
          Contact us
        </h3>
        <p className="text-neutral-600 ml-5">
          You can contact us on{" "}
          <Link to="tel:08056765391" className="text-blue-500">
            {" "}
            WhatsApp
          </Link>{" "}
          by clicking the link or call us at
          <Link to="tel:08056765391" className="text-blue-500">
            {" "}
            08056765391
          </Link>
          , you can also reach us at our{" "}
          <Link to="mailto:Norbilefoods@gmail.com" className="text-blue-500">
            {" "}
            Email
          </Link>{" "}
          and if youre feeling generous you can support us on{" "}
          <span className="font-semibold">Monie Point Bank:</span> 6382951582
        </p>
        <h3 className="text-neutral-600 font-bold text-xl mt-10 mb-4 ml-2">
          Location
        </h3>
        <p className="text-neutral-600 ml-5">
          We are located at shop 5, Godwin abbe way(limit road), off sapele
          road, Benin cite, Edo State
        </p>
        <h3 className="text-neutral-600 font-bold text-xl mt-10 mb-4 ml-2">
          Opening Hours
        </h3>
        <p className="text-neutral-600 ml-5">
          We are open from 11am to 10pm from mondays to saturdays and on sundays
          3pm to 10pm
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
