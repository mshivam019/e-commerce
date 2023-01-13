import React, { useState, useEffect,useContext} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "../utils/Store"
import * as Realm from "realm-web";
import {
  ShoppingCartIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Cart from "./Cart";

const Header = () => {
  const { state } = useContext(Store); 
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);

  useEffect(()=>{(async () => {
    if (searchTerm.length) {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const searchAutoComplete = await user.functions.searchAutoComplete(
          searchTerm
        );
        setAutoComplete(() => searchAutoComplete);
      } catch (error) {
        console.error(error);
      }
    } else {
      setAutoComplete([]);
    }
  })()}, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchTerm("");
    router.push({
      pathname: `/search/${searchTerm}`,
    });
  };

  const handleSelect = (id) => {
    setSearchTerm("");
    router.push({
      pathname: `/products/${id}`,
    });
  };

  return (
    <>
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
                EStore
              </div>
            </Link>
            <div className="flex items-center justify-end w-full">
            {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
              <button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
                <ShoppingCartIcon
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="h-5 w-5"
                />
              </button>

              <div className="flex sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <nav
            className={`${
              isMenuOpen ? "" : "hidden"
            } sm:flex sm:justify-center sm:items-center mt-4`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/">Home</Link>
              </div>
              <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/products">Shop</Link>
              </div>
              <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/category">Categories</Link>
              </div>
              <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
              <Link href="/about">About</Link>
              </div>
            </div>
          </nav>

          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5" />
            </span>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </form>
            {autoComplete.length > 0 && (
              <ul className="absolute inset-x-0 top-full bg-green-200 border border-green-500 rounded-md z-20">
                {autoComplete.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="px-4 py-2 hover:bg-green-300 cursor-pointer"
                      onClick={() => handleSelect(item._id)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </header>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>
  );
};

export default Header;
