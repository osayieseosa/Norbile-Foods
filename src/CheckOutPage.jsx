import { useContext, useEffect, useState } from "react";
import EcommerceHeader from "./EcommerceHeader";
import Footer from "./Footer";
import AppContext from "./context/AppProvider";
import PaystackPop from "@paystack/inline-js";
import Button from "./Button";
import { FaTimes } from "react-icons/fa";
import useAuth from "./Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const { cart, setCart, location, delivery, orders, setOrders, address, tel } =
    useContext(AppContext);
  const [date, setDate] = useState(new Date());
  const { auth } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [subTotal, setSubTotal] = useState(
    cart
      .map((item) => item.price * item.quantity)
      .reduce((partialSum, a) => partialSum + a, 0)
  );
  const [charges, setCharges] = useState(50);
  const [total, setTotal] = useState(0);
  const deliveryPrice = Number(
    delivery.find((item) => item.location.includes(location)).price
  );

  useEffect(() => {
    if (!tel?.length || !address?.length) {
      navigate("/location");
    } else if (!location?.length) {
      navigate("/question");
    }
    setTotal(subTotal + deliveryPrice + charges);
  }, [cart, charges, delivery, subTotal]);
  const handlePayment = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_live_83069cd56953ef073b096a4f07b09d5d7b2bc689",
      amount: total * 100,
      email: auth?.email,
      onSuccess(transaction) {
        const updateOrder = async () => {
          const order = {
            name: auth?.name,
            cart: {
              items: cart.map((item) => {
                return `${item.name} X ${item.quantity}`;
              }),
            },
            price: total,
            location: address,
            phone: tel,
            lga:
              delivery
                .find((item) => item.location === location)
                .location.toUpperCase() + " LGA",
            status: "unfulfilled",
            timeStamp: date.toDateString(),
          };
          try {
            await axios.post("/order", order, {
              headers: { "Content-Type": "application/json" },
            });
          } catch (error) {
            console.log(error);
          }
        };
        updateOrder();
        const message = `Transaction complete! Reference: ${transaction.reference}`;
        setCart([]);
        setSuccessMsg(message);
      },
      onCancel: () => {
        setErrMsg("Youre transaction has been cancelled");
      },
    });
  };
  return (
    <div className="relative">
      {errMsg || successMsg ? (
        <div
          className={`${
            errMsg ? "text-[#ef4a4a]" : "text-[#35e129]"
          } fixed  grid w-full h-screen place-content-center bg-[#000000a5] z-50 text-2xl font-bold px-10`}
        >
          {errMsg ? errMsg : successMsg ? successMsg : ""}
          <div
            className="text-slate-200 cursor-pointer flex gap-2 text-xl bg-[#09747b] w-min place-items-center px-4 py-2 rounded-lg mt-5 hover:scale-95"
            onClick={() => {
              if (errMsg) {
                setErrMsg("");
              } else {
                setSuccessMsg("");
              }
            }}
          >
            <FaTimes /> Ok
          </div>
        </div>
      ) : (
        ""
      )}
      <EcommerceHeader />
      {cart.length ? (
        <div className="py-10 px-5 space-y-10">
          <div className="text-2xl font-bold pl-2 text-neutral-900">
            Order Summary
          </div>
          <div className="space-y-10 border-b-2 border-neutral-400 pb-10">
            {cart.map((item) => {
              return (
                <div key={item.name} className="flex gap-2 ">
                  <div className="w-56 h-36">
                    <img
                      src={item.image.name}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-neutral-700">
                      {item.name}
                    </h1>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="font-medium text-neutral-600">
                      &#8358; {item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            <div>Sub Total:</div>
            <div>
              &#8358;
              {subTotal}
            </div>
          </div>
          <div className="flex justify-between">
            <div>Delivery</div> <div>&#8358; {deliveryPrice}</div>
          </div>
          <div className="flex justify-between">
            <div>Charges</div> <div>&#8358;50</div>
          </div>
          <div className="flex justify-between">
            <div>Total:</div> <div>&#8358;{total}</div>
          </div>
          <div
            className="text-slate-200 w-min"
            onClick={() => {
              handlePayment();
            }}
          >
            <Button content="Make Payment" size="text-sm" />
          </div>
        </div>
      ) : (
        <div className="w-full h-[50vh] grid place-content-center">
          <p className="text-2xl font-medium">Your Cart Is Empty</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CheckOutPage;
