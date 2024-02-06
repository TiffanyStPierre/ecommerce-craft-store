import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <>
  
    </>
  )
}
