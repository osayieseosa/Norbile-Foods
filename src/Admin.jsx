import React, { useState, useEffect, useContext } from "react";
import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";
import { FaArrowUp } from "react-icons/fa";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AuthContext from "./context/AuthProvider";
import AppContext from "./context/AppProvider";

const AdminPage = () => {
  const { auth } = useContext(AuthContext);
  const { charges, setCharges, delivery, setDelivery, loadPrices, id } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const [date, setDate] = useState(new Date());
  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/order", {
        headers: { "Content-Type": "application/json" },
      });
      setOrders(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);
  const handleUpdatePrices = async () => {
    setIsLoading(true);
    try {
      await axios.patch(
        "/prices",
        { id, charges, delivery },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      loadPrices();
      setErrMsg("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg("Check Internet Connection");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  const handleFulFill = async (item) => {
    setIsLoading(true);
    try {
      const reqObj = {
        id: item._id,
        name: item.name,
        cart: item.cart,
        price: item.price,
        location: item.location,
        phone: item.phone,
        lga: item.lga,
        status: "fulfilled",
        timeStamp: item.timeStamp,
      };
      await axios.patch("/order", reqObj, {
        headers: { "Content-Type": "application/json" },
      });
      loadOrders();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleDelete = async (item) => {
    setIsLoading(true);
    try {
      await axios.delete(`/order/${item._id}`);
      loadOrders();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="relative">
      {isLoading ? (
        <div className="fixed w-full h-screen bg-[#000000c0] z-50 grid place-content-center">
          <Loader size="w-10" currentColor="#0000ffab" />
        </div>
      ) : (
        ""
      )}

      <EcommerceHeader />
      {errMsg ? (
        <div className="relative z-50 w-full h-min text-red-400 bg-neutral-500 py-5 font-bold text-md flex gap-5 px-5 cursor-pointer">
          {errMsg}
          <div
            className="bg-blue-500 text-slate-200 w-min py-1 px-5 rounded-lg text-xs"
            onClick={() => setErrMsg("")}
          >
            Ok
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="p-10 space-y-5">
        <div className="w-full relative lg:max-w-4xl lg:m-[0_auto] py-5">
          <div className="text-red-400 absolute top-0 right-2 m-3 text-sm font-bold">
            {date.toDateString()}
          </div>
        </div>
        <p className="font-bold text-3xl text-slate-700 lg:max-w-4xl lg:m-[0_auto] py-4">
          Admin Page
        </p>
        <div className="font-bold text-sm flex gap-5 justify-end text-blue-400 lg:max-w-4xl lg:m-[0_auto] w-full ">
          <p
            onClick={() => navigate("/adminSignup")}
            className="cursor-pointer underline"
          >
            Register An Admin
          </p>
          <p
            onClick={() => navigate("/createFood")}
            className="cursor-pointer underline"
          >
            Add new Food
          </p>
        </div>
        <br />
        <hr />
        {charges ? (
          <div className="py-10 lg:max-w-4xl lg:m-[0_auto] relative overflow-x-auto">
            <h2 className="font-bold text-neutral-600 text-md py-5">
              Miscellaneous charges
            </h2>
            <div className="mb-2 flex gap-5">
              <label className="text-sm font-semibold text-neutral-500 flex w-min items-end">
                Charges:
              </label>
              <input
                type="text"
                className="border-b-2 border-neutral-500 w-32 outline-none bg-inherit text-neutral-500 text-sm p-1"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
              />
              <div
                className="min-w bg-blue-400 text-slate-200 text-xs font-bold h-min py-1 px-3 rounded-md hover:scale-95 cursor-pointer self-end"
                onClick={handleUpdatePrices}
              >
                UPDATE
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <label className="text-sm font-semibold text-neutral-500  flex w-max items-end">
                oredo delivery price:
              </label>
              <input
                type="text"
                className="border-b-2 border-neutral-500 w-32 outline-none bg-inherit text-neutral-500 text-sm p-1"
                value={delivery.oredo}
                onChange={(e) =>
                  setDelivery({ ...delivery, oredo: e.target.value })
                }
              />
              <div
                className="min-w bg-blue-400 text-slate-200 text-xs font-bold h-min py-1 px-3 rounded-md hover:scale-95 cursor-pointer self-end"
                onClick={handleUpdatePrices}
              >
                UPDATE
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <label className="text-sm font-semibold text-neutral-500  flex w-max items-end">
                egor delivery price:
              </label>
              <input
                type="text"
                className="border-b-2 border-neutral-500 w-32 outline-none bg-inherit text-neutral-500 text-sm p-1"
                value={delivery.egor}
                onChange={(e) =>
                  setDelivery({ ...delivery, ikhpoba: e.target.value })
                }
              />{" "}
              <div
                className="min-w bg-blue-400 text-slate-200 text-xs font-bold h-min py-1 px-3 rounded-md hover:scale-95 cursor-pointer self-end"
                onClick={handleUpdatePrices}
              >
                UPDATE
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <label className="text-sm font-semibold text-neutral-500 flex w-max items-end">
                ovia delivery price:
              </label>
              <input
                type="text"
                className="border-b-2 border-neutral-500 w-32 outline-none bg-inherit text-neutral-500 text-sm p-1"
                value={delivery.ovia}
                onChange={(e) =>
                  setDelivery({ ...delivery, ovia: e.target.value })
                }
              />{" "}
              <div
                className="min-w bg-blue-400 text-slate-200 text-xs font-bold h-min py-1 px-3 rounded-md hover:scale-95 cursor-pointer self-end"
                onClick={handleUpdatePrices}
              >
                UPDATE
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <label className="text-sm font-semibold text-neutral-500 flex w-max items-end">
                ikpoba okha delivery price:
              </label>
              <input
                type="text"
                className="border-b-2 border-neutral-500 w-32 outline-none bg-inherit text-neutral-500 text-sm p-1"
                value={delivery.ikpoba}
                onChange={(e) =>
                  setDelivery({ ...delivery, ikhpoba: e.target.value })
                }
              />{" "}
              <div
                className="min-w bg-blue-400 text-slate-200 text-xs font-bold h-min py-1 px-3 rounded-md hover:scale-95 cursor-pointer self-end"
                onClick={handleUpdatePrices}
              >
                UPDATE
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="w-full min-h-[50vh]">
          <div className="relative overflow-x-auto text-gray-500 lg:max-w-4xl lg:m-[0_auto] rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <FaArrowUp />
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    LGA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    fulfill
                  </th>
                  <th scope="col" className="px-6 py-3">
                    complete
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length ? (
                  orders.map((item, i) => {
                    return (
                      <tr className="bg-white border-b" key={i}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {++i}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.cart.items
                            .map((food, i) => {
                              return food;
                            })
                            .join()}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.timeStamp}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          &#8358; {item.price}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.lga}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <button
                            onClick={() => {
                              handleFulFill(item);
                            }}
                          >
                            fulfiled
                          </button>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <button onClick={() => handleDelete(item)}>
                            delivered
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="whitespace-nowrap py-2 px-4 font-bold">
                      {`No More Orders to display, sorry ${auth?.name}`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
