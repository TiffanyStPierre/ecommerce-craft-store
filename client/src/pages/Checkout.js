import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import PageSubtitle from "../components/PageSubtitle";

export default function Checkout() {
  const { cartItems, getOrderTotal, getOrderSubtotal, getOrderTax, clearCart } =
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

  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const {
    first_name,
    last_name,
    email,
    street_address,
    city,
    province,
    postal_code,
  } = checkoutData;

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const onChange = (e) => {
    setCheckoutData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      order: {
        customer: checkoutData,
        cartItems: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        subtotal_amount: getOrderSubtotal(),
        tax_amount: getOrderTax(),
        total_amount: getOrderTotal(),
      },
    };

    axios
      .post("/api/order/new", orderData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          handleShow();
          setFormError(false);
          clearCart();
          setCheckoutData({
            first_name: "",
            last_name: "",
            email: "",
            street_address: "",
            city: "",
            province: "",
            postal_code: "",
          });
        } else {
          setFormError(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      <PageSubtitle subtitle="Check Out" />
      <h3>Enter Payment & Address Information</h3>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postForm.ControlTextarea">
              <Form.Label>
                Your order was submitted. We will send you an email confirmation
                with your order details.
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {formError && (
        <Alert variant="danger" className="text-center mt-4">
          There was a problem submitting your order. Please make sure all fields
          are filled in and try again.
        </Alert>
      )}

      <Form onSubmit={onSubmit}>
        <div
          className="mt-4 container-border text-center mx-auto"
          style={{ width: "40%" }}
        >
          <h4 className="my-4">Shipping Information</h4>
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
        <div
          className="my-5 container-border text-center mx-auto"
          style={{ width: "40%" }}
        >
          <h4 className="mt-4">Credit Card Information</h4>
          <Form.Text>
            Note: This is not a real store and credit card information is not
            required to submit the form
          </Form.Text>
          <Form.Group
            className="my-4 form-input-group mx-auto"
            controlId="credit_card"
          >
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control type="text" name="credit_card" />
          </Form.Group>
          <Form.Group
            className="mb-4 form-input-group mx-auto"
            controlId="expiry_date"
          >
            <Form.Label>Expiry Date mm/yy</Form.Label>
            <Form.Control type="text" name="expiry_date" />
          </Form.Group>
          <Form.Group className="mb-4 form-input-group mx-auto" controlId="cvc">
            <Form.Label>CVC</Form.Label>
            <Form.Control type="text" name="cvc" />
          </Form.Group>
        </div>
        <div className="text-center">
          <p className="h2">Order Total</p>
          <p className="h2">{`$${getOrderTotal()}`}</p>
          <div className="mt-4">
            <Button className="custom-button me-2" type="submit">
              Submit Order
            </Button>
            <Link to="/cart">
              <Button variant="outline-dark" className="ms-2">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </Form>
      {formError && (
        <Alert variant="danger" className="text-center mt-4">
          There was a problem submitting your order. Please make sure all fields
          are filled in and try again.
        </Alert>
      )}
      <div className="page-footer-buffer"></div>
    </>
  );
}
