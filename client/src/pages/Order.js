import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderLineItem from "../components/OrderLineItem";
import { Container, Row, Col } from "react-bootstrap";
import PageSubtitle from "../components/PageSubtitle";

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({
    order: {},
    customer: {},
    products_with_quantity: [],
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/order/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchOrder function on page load
    fetchOrder();
  }, [id]);

  return (
    <>
      <PageSubtitle subtitle="Admin - Order Details" />
      <h3>Customer Order Details</h3>
      <div className="mt-3 container-border text-center mx-auto" style={{ width: "60%" }}>
      <Container>
        <Row className="justify-content-around">
          <Col className="text-center">
            <h4 className="mt-4 mb-1">Customer</h4>
            <p>
              {order.customer.first_name} {order.customer.last_name}
              <br />
              {order.customer.street_address}
              <br />
              {order.customer.city}, {order.customer.province}
              <br />
              {order.customer.postal_code}
              <br />
              {order.customer.email}
            </p>
          </Col>
          <Col className="text-center">
            <h4 className="mt-4 mb-1">Order Date</h4>
            <p>{order.order.order_date}</p>
            <h4 className="mt-4 mb-1">Date Shipped</h4>
            <p>{order.order.shipped_date}</p>
          </Col>
          <Col className="text-center">
            <h4 className="mt-4 mb-1">Invoice #</h4>
            <p>{order.order.id}</p>
          </Col>
          <Col className="text-center">
            <h4 className="mt-4 mb-1">Order Total</h4>
            <p>${order.order.total_amount}</p>
          </Col>
        </Row>
        <div className="mb-5">
          <h4 className="mt-5 mb-4">Items Ordered</h4>
          <Row>
            <Col className="h5">
              <h5>Item</h5>
            </Col>
            <Col className="h5">
              <h5>Quantity</h5>
            </Col>
            <Col className="h5">
              <h5>Price</h5>
            </Col>
            <Col className="h5">
              <h5>Item Subtotal</h5>
            </Col>
          </Row>
          {order.products_with_quantity.map((product, index) => (
            <OrderLineItem key={index} product={product} />
          ))}
        </div>
        </Container>
        <div className="d-flex flex-column align-items-end mx-5 mb-4">
          <div className="d-flex mx-4">
            <h4 className="me-4">Order Subtotal</h4>
            <h4>${parseFloat(order.order.subtotal_amount).toFixed(2)}</h4>
          </div>
          <div className="d-flex mx-4">
            <h4 className="me-4">Tax</h4>
            <h4>${parseFloat(order.order.tax_amount).toFixed(2)}</h4>
          </div>
          <div className="d-flex mx-4">
            <h4 className="me-4">Order Total</h4>
            <h4>${parseFloat(order.order.total_amount).toFixed(2)}</h4>
          </div>
        </div>
      
      </div>
      <div className="page-footer-buffer"></div>
    </>
  );
}

