import { useState, useRef, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import Carousel from "./Carousel";
import Menu from "./Menu";
import Button from "./Button";
import StoreCarousel from "./StoreCarousel";
import emailjs from "emailjs-com";
import AppContext from "./context/AppProvider";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef();
  const form = useRef();
  const [fixed, setFixed] = useState(false);
  const { menu, setMenu, scrollPosition, loadFoodItems } =
    useContext(AppContext);
  useEffect(() => {
    if (scrollPosition < heroRef.current.scrollHeight) {
      setFixed(false);
    } else {
      setFixed(true);
    }
  }, [scrollPosition]);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qbgfr84",
        "template_9xyw15m",
        form.current,
        "y-XwNtejhQ2lh2o0q"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="w-full min-h-screen relative">
      <div
        ref={heroRef}
        className="w-full h-min relative flex overflow-hidden pb-10"
      >
        <div className="z-20 relative w-full space-y-4">
          <div
            className={`${
              fixed ? "fixed bg-neutral-950" : "bg-transparent"
            } w-full`}
          >
            <div className="lg:max-w-4xl lg:m-[0_auto] flex justify-between items-center px-7 h-32">
              <div className="w-32">
                <img
                  src="media/Logo.png"
                  alt="Company logo"
                  className="w-full brightness-200 object-cover"
                />
              </div>
              <Menu menu={menu} setMenu={setMenu} />
              <div
                className="text-[#82b8dfc0] text-5xl font-thin cursor-pointer hover:scale-105 md:hidden"
                onClick={() => setMenu(true)}
              >
                <FaBars />
              </div>
            </div>
          </div>
          <div className="text-slate-200 space-y-20 px-7 md:max-w-2xl md:m-[0_auto] md:grid md:place-items-center">
            <h1 className="text-6xl font-bold leading-tight pt-10 md:text-center md:text-8xl">
              It All <br />
              Started
              <br /> From One
              <br /> Dream
            </h1>
            <div className="h-min w-min" onClick={() => navigate("/shop")}>
              <Button content="ORDER NOW" />
            </div>
          </div>
        </div>

        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute z-10 w-auto min-w-full min-h-full brightness-50 aspect-auto object-cover"
        >
          <source src="./media/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-full  bg-[#8d9ea7]">
        <div className="w-full py-10 text-center sm:max-w-2xl sm:m-[0_auto] text-slate-100">
          <h1 className="text-3xl font-bold pb-10">IMAGE GALLERY</h1>
          <Carousel />
        </div>
      </div>
      <div className="w-full bg-[#343434]">
        <div className="w-full p-10 sm:max-w-2xl sm:m-[0_auto] text-slate-100">
          <h1 className="text-3xl font-bold pb-10">Shop</h1>
          <div>
            <div className="w-full overflow-hidden">
              <StoreCarousel />
              <div className="w-min" onClick={() => navigate("/shop")}>
                <Button content="VIEW MORE" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#8d9ea7]">
        <div className="w-full p-10 sm:max-w-2xl sm:m-[0_auto] text-slate-100">
          <header className="text-3xl font-bold pb-10">What We Do</header>
          <main className="mb-10 text-lg max-w-[75ch] text-slate-200">
            Hello! At Norbile foods, we take pride in delivering delicious food
            worldwide. Our primary focus is ensuring long-trem satisfaction
            throught professional service. We're committed to making your
            culinary experience exceptional, wherever you are!
          </main>
          <div className="w-min" onClick={() => navigate("/about")}>
            <Button content="learn more" size="text-sm" />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#8d9ea7] bg-[url('images/CTA.svg')]">
        <div className="w-full p-10 sm:max-w-2xl sm:m-[0_auto] text-slate-100">
          <header className="text-2xl">
            Got a project or partnership in mind?
          </header>
          <p className="text-5xl font-extrabold mt-2 mb-6 text-slate-300">
            Lets Talk
          </p>
          <Link to="/about" className="w-min">
            <Button content="contact us" size="text-xs" />
          </Link>
        </div>
      </div>
      <div>
        <div className="w-full bg-[#3c5461]">
          <div className="w-full p-10 sm:max-w-2xl sm:m-[0_auto] text-slate-200">
            <h1 className="font-bold text-3xl">
              Have A <span className="text-[#d42929d0]">Question?</span>
            </h1>
          </div>
        </div>
        <div className="w-full bg-[url('./images/contact.webp')] bg-no-repeat h-max bg-cover">
          <form
            className="w-full px-10 py-32 sm:max-w-2xl sm:m-[0_auto] text-white"
            onSubmit={sendEmail}
            ref={form}
          >
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-transparent border-b-2 border-slate-300 p-5 placeholder:text-white focus:outline-none max-w-sm text-lg"
              placeholder="full name"
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full bg-transparent border-b-2 border-slate-300 p-5 placeholder:text-white focus:outline-none max-w-sm text-lg"
              placeholder="email"
            />
            <label htmlFor="question" className="sr-only">
              Message
            </label>
            <textarea
              type="text"
              id="question"
              className="w-full bg-transparent border-b-2 border-slate-300 p-5 placeholder:text-white focus:outline-none max-w-sm text-lg resize-none"
              placeholder="message"
              name="message"
            />
            <button
              type="submit"
              className="font-semibold py-2 px-5 bg-red-700 w-max mt-5 rounded-lg cursor-pointer hover:scale-95 duration-75"
            >
              Ask Question
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
