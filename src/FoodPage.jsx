import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppProvider";
import { useNavigate, useParams } from "react-router-dom";
import ItemQuantity from "./ItemQuantity";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";

const FoodPage = () => {
  const navigate = useNavigate();
  const { addToCart, items, cart, handleDelete, handleEdit } =
    useContext(AppContext);
  const { foodName } = useParams();
  const food = items.find((item) => item.name === foodName);
  return (
    <div>
      <EcommerceHeader />
      {food ? (
        <div className="grid place-content-center gap-4 border-b-2 border-neutral-300 overflow-hidden p-8 bg-gray-200 w-min rounded-lg m-[0_auto] h-full my-10">
          <div className="w-52 h-44 ">
            <img
              src={food.image.name}
              alt={food.name}
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-min flex flex-col pt-5 h-full px-1 place-content-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
              {food.name}
            </h1>
            <p className="text-lg font-semibold text-neutral-700">
              &#8358; {food?.price}
            </p>
            {cart.length &&
            cart.some((cartItem) => {
              return cartItem.name === food.name;
            }) ? (
              <div className="mt-5">
                <ItemQuantity item={food} />
              </div>
            ) : (
              <>
                <div className="flex h-min mt-2 gap-2 text-slate-50 place-content-center w-min">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-slate-50 bg-neutral-700 w-max py-2 px-3 font-semibold cursor-pointer rounded-md text-xs h-min"
                    onClick={() => {
                      addToCart(food);
                    }}
                  >
                    ADD TO CART
                  </motion.div>
                  <div className="flex text-slate-200 gap-2">
                    <div
                      className="p-2 grid place-content-center rounded-md bg-neutral-700 cursor-pointer hover:scale-95 duration-200 text-xs "
                      onClick={() => {
                        handleDelete(food);
                      }}
                    >
                      <FaTrash />
                    </div>
                    <div
                      className="grid place-content-center rounded-md bg-neutral-700 cursor-pointer hover:scale-95 duration-250 text-xs p-2"
                      onClick={() => {
                        handleEdit(food);
                      }}
                    >
                      <FaEdit />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Footer />
    </div>
  );
};

export default FoodPage;
