import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Store } from "../utils/Store";
import {
  XIcon,
  PlusCircleIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const [first, setFirst] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(first + " this coupon is not valid");
  };
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item) => {
    const existItem = item.quantity;
    const quantity = existItem + 1;
    if (item.countInStock < quantity) {
      return alert("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <div
      className={`${
        isCartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 z-20`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <button className="text-gray-600 focus:outline-none">
          <XIcon
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="h-5 w-5"
          />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <hr className="my-3" />
              <div className="flex justify-between mt-6">
                <div className="flex">
                  <Image
                    src={item.image}
                    height={80}
                    width={80}
                    style={{ objectFit: "cover" }}
                    className="rounded"
                    alt={item.name}
                  />
                  <div className="mx-3">
                    <h3 className="text-sm text-gray-600">{item.name}</h3>
                    <div className="flex items-center mt-2">
                      <button
                        className="text-gray-500 focus:outline-none focus:text-gray-600"
                        onClick={() => updateCartHandler(item)}
                      >
                        <PlusCircleIcon className="h-5 w-5" />
                      </button>
                      <span className="text-gray-700 mx-2">
                        {item.quantity}{" "}
                      </span>
                      <button
                        className="text-gray-500 focus:outline-none focus:text-gray-600"
                        onClick={() => removeItemHandler(item)}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <span className="text-gray-600">${item.price}</span>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <form
              className="flex items-center justify-center"
              onSubmit={handleSubmit}
            >
              <input
                className="form-input w-48"
                type="text"
                id="first"
                name="first"
                placeholder="Add promocode"
                value={first}
                onChange={(event) => setFirst(event.target.value)}
              />
              <button
                type="submit"
                className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
              >
                <span>Apply</span>
              </button>
            </form>
          </div>
          <a className="flex items-center justify-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500 cursor-pointer">
            <span>Check out</span>
            <ArrowNarrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;
