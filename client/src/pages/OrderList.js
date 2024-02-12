import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import OrderListItem from "../components/OrderListItem";
import PageSubtitle from "../components/PageSubtitle";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [shippedFilter, setShippedFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
        setDisplayOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (e) => {
    const selectedShipStatus = e.target.value;
    setShippedFilter(selectedShipStatus); // Update the shippedFilter state
  
    if (selectedShipStatus === "") {
      // If no filter is selected, display all orders
      setDisplayOrders(orders);
    } else if (selectedShipStatus === "shipped") {
      // Filter orders with a shipped_date
      const filteredOrders = orders.filter((order) => order.shipped_date);
      setDisplayOrders(filteredOrders);
    } else if (selectedShipStatus === "not shipped") {
      // Filter orders without a shipped_date
      const filteredOrders = orders.filter((order) => !order.shipped_date);
      setDisplayOrders(filteredOrders);
    }
  };

  return (
    <>
      <PageSubtitle subtitle="Admin - Orders" />
      <h3>Orders</h3>
      <Form>
        <Form.Group
          className="mt-5 form-input-group mx-auto text-center"
          controlId="category"
        >
          <Form.Label className="h6">Filter by Shipping Status</Form.Label>
          <Form.Select
            aria-label="Shipment Status"
            name="shippedFilter"
            value={shippedFilter}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="shipped">Shipped</option>
            <option value="not shipped">Not Shipped</option>
          </Form.Select>
        </Form.Group>
      </Form>
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
        {displayOrders.map((order) => (
          <OrderListItem key={order.id} order={order} />
        ))}
      </Container>
      <div className="page-footer-buffer"></div>
    </>
  );
}
