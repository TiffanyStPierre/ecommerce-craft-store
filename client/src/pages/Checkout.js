import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, getOrderTotal, getOrderSubtotal, getOrderTax } = useContext(CartContext);

  return (
    <>
    </>
  )
}