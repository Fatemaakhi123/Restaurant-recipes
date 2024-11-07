"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Navbarone from "@/components/Navbarone";

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser); 
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    if (!isLoggedIn) {
      alert("You must be logged in to remove items from your cart.");
      return;
    }

    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to proceed to checkout.");
      return;
    }

    alert("Proceeding to checkout...");
  };

  return (
    <>
      {isLoggedIn ? <Navbarone /> : <Navbar />}
      <div className="bg-gray-50 min-h-screen flex flex-col items-center">
        <div className="container mx-auto py-8 px-4 mt-6">
          <h1 className="text-3xl text-center font-bold mb-6">Your Cart</h1>
          {!isLoggedIn ? (
            <p className="text-center text-lg text-gray-600">
              You must be logged in to view your cart. Please{" "}
              <a href="/login" className="text-yellow-500">login</a>.
            </p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col ml-3 flex-grow">
                    <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                  <span className="text-xs text-gray-700">x{item.quantity}</span>

                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>

                  <button
                    className="bg-yellow-500 text-white py-2 px-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm ml-2"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
