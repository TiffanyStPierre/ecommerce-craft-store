import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartLineItem from "../components/CartLineItem";
import { Container, Row, Col } from "react-bootstrap";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <>
      <h2 className="page-subtitle">Your Cart</h2>
      <h3>Review Your Order</h3>
      <div
        className="mt-3 container-border text-center mx-auto"
        style={{ width: "60%" }}
      >
        <div>
          {cartItems.map((item) => (
            <CartLineItem key={item.id} product={item} />
          ))}
        </div>
      </div>
      <div className="page-footer-buffer"></div>
    </>
  );
}
