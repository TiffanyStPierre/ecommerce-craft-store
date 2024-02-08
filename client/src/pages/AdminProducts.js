import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminProductItem from "../components/AdminProductItem";
import { Container, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const showProductModal = (breakpoint, product, promotionNames) => {
    setFullscreen(breakpoint);
    setSelectedProduct({ ...product, promotionNames });
    setShow(true);
  };

  const deleteProductConfirm = () => {
    setConfirmDelete(true);
  }

  const deleteProduct = async () => {
    try {
      const productId = selectedProduct.id;

      await axios.delete(`/api/product/${productId}`);

      setProducts((prevProducts) => 
      prevProducts.filter((product) => product.id !== productId)
      );

      setShow(false);
      setConfirmDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard - Products</h2>
      <h3>Products</h3>
      <div className="text-center mt-5">
        <Link to="/product/new" className="link">
          <Button className="custom-button" size="lg">
            Add Product
          </Button>
        </Link>
      </div>
      <Modal
        size="lg"
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct ? selectedProduct.name : "Product Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="m-5">
              <div className="d-flex">
                <img
                  src={selectedProduct.thumbnail_url}
                  alt={selectedProduct.name}
                  className="rounded me-5 mb-4"
                />
                <div className="ms-5">
                  <p className="mb-2">Product #: {selectedProduct.id}</p>
                  <p className="mb-2">Price: ${selectedProduct.price}</p>
                  <p className="mb-2">
                    Category: {selectedProduct.categories[0].name}
                  </p>
                  <p className="mb-2">Inventory: {selectedProduct.inventory}</p>
                  <p className="mb-2">
                    Promotions: {selectedProduct.promotionNames}
                  </p>
                </div>
              </div>
              <p>{selectedProduct.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedProduct && (
            <>
            {confirmDelete && (
              <Alert variant="danger" className="me-5">
                Are you sure you want to delete this product?
                <Button variant="outline-danger" className="ms-4" onClick={deleteProduct}>Yes</Button>
                <Button variant="outline-danger" className="ms-4" onClick={() => setConfirmDelete(false)}>No</Button>
                </Alert>
            )}
              <Link to={`/product/edit/${selectedProduct.id}`} state={{ product: selectedProduct }}>
                <Button className="custom-button">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </Link>
              <Button variant="danger" className="ms-3" onClick={deleteProductConfirm}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </>
          )}
        </Modal.Footer>
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
          <AdminProductItem
            key={product.id}
            product={product}
            onClick={(bp, promotions) =>
              showProductModal(bp, product, promotions)
            }
          />
        ))}
      </Container>
      <div className="page-footer-buffer"></div>
    </>
  );
}
