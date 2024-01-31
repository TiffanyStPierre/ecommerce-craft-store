import { useState, useEffect } from "react";
import axios from "axios";
import AdminProductItem from "../components/AdminProductItem";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, []);

  const showProductModal = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard - Products</h2>
      <h3>Products</h3>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
      <Container className="mt-5 px-5 container-border">
        <Row className="d-none d-md-flex align-items-center pt-4 pb-2">
          <Col style={{ width: "100px" }} className="text-center h5">
          <strong>Image</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Name</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Price</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Category</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Inventory</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Promotions</strong>
          </Col>
        </Row>
        {products.map((product) => (
          <AdminProductItem key={product.id} product={product} onClick={showProductModal} />
        ))}
      </Container>
      <div className="page-footer-buffer"></div>
    </>
  );
}
