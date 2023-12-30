import { motion } from "framer-motion";
import { useState, useEffect, useRef, useContext } from "react";
import AppContext from "./context/AppProvider";

const StoreCarousel = () => {
  const { items } = useContext(AppContext);
  const shopCarousel = useRef();
  const [width, setWidth] = useState("");

  useEffect(() => {
    setWidth(
      shopCarousel.current.scrollWidth - shopCarousel.current.offsetWidth
    );
  }, []);
  return (
    <motion.div
      drag={"x"}
      dragConstraints={{ right: 0, left: -width }}
      className="flex my-5 cursor-grab"
      ref={shopCarousel}
      whileDrag={{ cursor: "grabbing" }}
    >
      {items.map((item, index) => {
        return (
          <div className="min-w-full" key={index}>
            <img
              src={item.image.name}
              alt={item.name}
              className="w-full object-cover pointer-events-none h-52 sm:h-96"
            />
            <div className="text-2xl font-bold text-slate-200 my-2">
              {item.name}
            </div>
            <div className="text-lg text-[#dfa878]">{item.price}</div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default StoreCarousel;
