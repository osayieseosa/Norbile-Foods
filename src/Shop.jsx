import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppProvider";
import ItemQuantity from "./ItemQuantity";
import { motion } from "framer-motion";
import axios from "./api/axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const SHOP_URL = "/food";

const Shop = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { cart, addToCart, items, loadFoodItems } = useContext(AppContext);

  const handleDelete = async (item) => {
    setIsLoading(true);
    try {
      await axios.delete(`${SHOP_URL}/${item._id}`);
      loadFoodItems();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (item) => {
    navigate(`/editfood/${item.name}`);
  };

  return (
    <div>
      {isLoading && (
        <div className="w-full h-screen fixed bg-[#000000ac] grid place-content-center z-50">
          <Loader size={"w-10"} />
        </div>
      )}
      <EcommerceHeader />
      <div className="bg-slate-100">
        <div className="sm:max-w-2xl sm:m-[0_auto] lg:max-w-4xl">
          {items.length ? (
            <div className="w-full h-full py-14 px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="grid place-content-center gap-4 border-b-2 border-neutral-300 overflow-hidden p-8 bg-gray-200 w-min rounded-lg m-[0_auto] h-full"
                  >
                    <div className="w-52 h-44 ">
                      <img
                        src={item.image.name}
                        alt={item.name}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="w-min flex flex-col pt-5 h-full px-1 place-content-center">
                      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                        {item.name}
                      </h1>
                      <p className="text-lg font-semibold text-neutral-700">
                        &#8358; {item.price}
                      </p>
                      {cart?.length &&
                      cart.some((cartItem) => {
                        return cartItem.name === item.name;
                      }) ? (
                        <div className="mt-5">
                          <ItemQuantity item={item} />
                        </div>
                      ) : (
                        <>
                          <div className="flex h-min mt-2 gap-2 text-slate-50 place-content-center w-min">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="text-slate-50 bg-neutral-700 w-max py-2 px-3 font-semibold cursor-pointer rounded-md text-xs h-min"
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              ADD TO CART
                            </motion.div>

                            {auth?.roles?.find((role) => role === "2006") && (
                              <div className="flex text-slate-200 gap-2">
                                <div
                                  className="p-2 grid place-content-center rounded-md bg-neutral-700 cursor-pointer hover:scale-95 duration-200 text-xs "
                                  onClick={() => {
                                    handleDelete(item);
                                  }}
                                >
                                  <FaTrash />
                                </div>
                                <div
                                  className="grid place-content-center rounded-md bg-neutral-700 cursor-pointer hover:scale-95 duration-250 text-xs p-2"
                                  onClick={() => {
                                    handleEdit(item);
                                  }}
                                >
                                  <FaEdit />
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-[calc(100vh_-_210px)] grid place-content-center font-bold">
              <Loader size={"w-14"} currentColor={"blue"} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
