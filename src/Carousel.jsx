import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import images from "./images";

const Carousel = () => {
  const carousel = useRef();
  const [width, setWidth] = useState("");

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div>
      <motion.div className="cursor-grab overflow-hidden" ref={carousel}>
        <motion.div
          drag={"x"}
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-2 py-5 px-7 w-min"
        >
          {images.map((image, index, arrayObj) => {
            return (
              <motion.div
                className="h-[20rem] min-w-[20rem] relative"
                key={index}
              >
                <div className="bg-neutral-600 w-max rounded-xl px-4 py-1 text-xs absolute right-0 my-5 mx-2">{`${
                  index + 1
                }/${arrayObj.length}`}</div>
                <img
                  src={image}
                  className="w-full h-full object-cover rounded-xl pointer-events-none border-4 border-[#b009099c]"
                  alt={image}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Carousel;
