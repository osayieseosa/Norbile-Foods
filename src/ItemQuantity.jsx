import { FaTrash, FaPlus } from "react-icons/fa";
import { useContext } from "react";
import AppContext from "./context/AppProvider";
import { motion } from "framer-motion";

const ItemQuantity = ({ item }) => {
  const { cart, setCart, addToCart, removeFromCart } = useContext(AppContext);
  return (
    <motion.div
      className="flex overflow-hidden rounded-lg border-2 cursor-pointer border-neutral-700 w-min bg-neutral-600 text-neutral-200 text-xs"
      whileHover={{ x: 5 }}
    >
      <div
        className=" py-1 px-2 flex items-center"
        onClick={() => {
          removeFromCart(item);
        }}
      >
        <FaTrash />
      </div>
      <div className=" py-1 px-5 bg-slate-200 text-neutral-600 font-bold">
        {cart.map((cartItem) => {
          if (cartItem.name === item.name) {
            return cartItem.quantity;
          }
        })}
      </div>
      <div
        className="py-1 px-2 flex items-center"
        onClick={() => {
          addToCart(item);
        }}
      >
        <FaPlus />
      </div>
    </motion.div>
  );
};

export default ItemQuantity;
