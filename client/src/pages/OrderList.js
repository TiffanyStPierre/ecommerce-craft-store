import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import OrderListItem from "../components/OrderListItem";

export default function OrderList() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchOrders function on page load
    fetchOrders();
  }, []);

  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard - Orders</h2>
      <h3>Orders</h3>
      <Container className="mt-5 px-5 container-border">
        <Row className="d-none d-md-flex align-items-center pt-4 pb-2">
          <Col className="text-center h5">
          <strong>Invoice #</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Customer Name</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Order Date</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Order Total</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Date Shipped</strong>
          </Col>
        </Row>
        {orders.map((order) => (
          <OrderListItem key={order.id} order={order} />
        ))}
      </Container>
      <div className="page-footer-buffer"></div>
    </>
  )
}