import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Button, Form } from "react-bootstrap";

export default function Checkout() {
  const { cartItems, getOrderTotal, getOrderSubtotal, getOrderTax } =
    useContext(CartContext);
  const [checkoutData, setCheckoutData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const {
    first_name,
    last_name,
    email,
    street_address,
    city,
    province,
    postal_code,
  } = checkoutData;

  const onChange = (e) => {
    setCheckoutData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h2 className="page-subtitle">Check Out</h2>
      <h3>Enter Payment & Address Information</h3>
      <Form>
        <div>
          <h4>Shipping Information</h4>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="first_name"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={first_name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="last_name"
          >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={last_name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="email"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="street_address"
          >
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              name="street_address"
              value={street_address}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="city"
          >
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={city}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="province"
          >
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              name="province"
              value={province}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="postal_code"
          >
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postal_code"
              value={postal_code}
              onChange={onChange}
            />
          </Form.Group>
        </div>
        <div>
          <h4>Credit Card Information</h4>
        </div>
        <div>
          <p className="h2">Order Total</p>
          <p className="h2">{`$${getOrderTotal()}`}</p>
          <Button className="custom-button">Submit Order</Button>
          <Link to="/cart">
            <Button variant="outline-dark">Back to Cart</Button>
          </Link>
        </div>
      </Form>
      <div className="page-footer-buffer"></div>
    </>
  );
}
