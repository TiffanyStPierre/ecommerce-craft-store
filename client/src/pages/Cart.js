import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartLineItem from "../components/CartLineItem";
import { Button, Row, Col } from "react-bootstrap";
import "../styles/cart.css";

export default function Cart() {
  const { cartItems, clearCart, getOrderTotal, getOrderSubtotal, getOrderTax } = useContext(CartContext);

  return (
    <>
      <h2 className="page-subtitle">Your Cart</h2>
      <h3>Review Your Order</h3>

      {cartItems.length === 0 && (
        <p className="text-center h4 my-5">There are no items in your cart.</p>
      )}

      <div
        className="mt-3 container-border text-center mx-auto cart-container"
      >
        <Row className="my-2 d-none d-md-flex align-items-center p-2 admin-product-item h6">
        <Col xs={3} md={2}>
        </Col>
        <Col>Item</Col>
        <Col>Quantity</Col>
        <Col>Price</Col>
        <Col>Item Subtotal</Col>
        <Col>
        </Col>
      </Row>
        <div>
          {cartItems.map((item) => (
            <CartLineItem key={item.id} product={item} />
          ))}
        </div>
      </div>
      {cartItems.length !== 0 && (
        <div className="d-flex flex-column align-items-center mt-4">
          <p className="h5">{`Subtotal: $${getOrderSubtotal()}`}</p>
          <p className="h5">{`Tax: $${getOrderTax()}`}</p>
          <p className="h4">{`Order Total: $${getOrderTotal()}`}</p>
        </div>
      )}
      <div className="d-flex justify-content-center mt-4">
        {cartItems.length !== 0 && (
          <Link to="/checkout">
            <Button className="custom-button me-3">Checkout</Button>
          </Link>
        )}
        <Link to="/">
          <Button className="custom-button">Continue Shopping</Button>
        </Link>
        {cartItems.length !== 0 && (
          <Button
            variant="outline-dark"
            className="ms-3"
            onClick={() => clearCart()}
          >
            Empty Cart
          </Button>
        )}
      </div>
      <div className="page-footer-buffer"></div>
    </>
  );
}
