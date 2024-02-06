import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartLineItem from "../components/CartLineItem";
import { Button } from "react-bootstrap";

export default function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);

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
      <div className="d-flex justify-content-center mt-4">
        <Link to="/checkout">
        <Button className="custom-button me-3">Checkout</Button>
        </Link>
        <Button variant="outline-dark" className="ms-3" onClick={() => clearCart()}>Empty Cart</Button>
      </div>
      <div className="page-footer-buffer"></div>
    </>
  );
}
