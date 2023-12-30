import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Button = ({ content, size, py, px }) => {
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className={`${px ? px : "px-8"} ${
        py ? py : "py-4"
      } bg-[#6c3428] flex items-center gap-2 rounded-lg font-bold w-max cursor-pointer ${
        size ? size : "text-normal"
      }`}
    >
      {content ? content.toUpperCase() : "Text"}
      <FaArrowRight />
    </motion.div>
  );
};

export default Button;
