import { useState, useEffect } from "react";
import axios from "axios";
import AdminProduct from "../components/AdminProduct";
import { Container, Row, Col } from "react-bootstrap";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard - Product List</h2>
      <h3>Products</h3>
      <Container className="mt-5">
        <Row className="d-none d-md-flex">
          <Col>
          </Col>
          <Col>
            <strong>Name</strong>
          </Col>
          <Col>
            <strong>Price</strong>
          </Col>
          <Col>
            <strong>Category</strong>
          </Col>
          <Col>
            <strong>Inventory</strong>
          </Col>
          <Col>
            <strong>Promotions</strong>
          </Col>
        </Row>
        {products.map((product) => (
          <AdminProduct key={product.id} product={product} />
        ))}
      </Container>
      <div className="page-footer-buffer"></div>
    </>
  );
}
