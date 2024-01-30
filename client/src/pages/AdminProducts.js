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
          <AdminProduct key={product.id} product={product} />
        ))}
      </Container>
      <div className="page-footer-buffer"></div>
    </>
  );
}
