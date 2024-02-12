import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminProductItem from "../components/AdminProductItem";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PageSubtitle from "../components/PageSubtitle";
import FooterBuffer from "../components/FooterBuffer";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInventoryStatus, setSelectedInventoryStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items per page

  // Calculate index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayProducts = displayProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        setDisplayProducts(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchCategories function on page load
    fetchCategories();
  }, []);

  const showProductModal = (breakpoint, product, promotionNames) => {
    setFullscreen(breakpoint);
    setSelectedProduct({ ...product, promotionNames });
    setShow(true);
  };

  const deleteProductConfirm = () => {
    setConfirmDelete(true);
  };

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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    let filteredProducts = products;

    if (selectedCategory !== "") {
      // Filter products based on the selected category
      filteredProducts = filteredProducts.filter((product) =>
        product.categories.some((cat) => cat.name === selectedCategory)
      );
    }

    // Apply the inventory status filter on the already filtered products
    filteredProducts = applyInventoryStatusFilter(
      filteredProducts,
      selectedInventoryStatus
    );

    setDisplayProducts(filteredProducts);
    setSelectedCategory(selectedCategory);
    setCurrentPage(1);
  };

  const handleInventoryStatusChange = (e) => {
    const selectedInventory = e.target.value;

    let filteredProducts = products;

    // Apply the category filter on the already filtered products
    filteredProducts = applyCategoryFilter(filteredProducts, selectedCategory);

    // Apply the inventory status filter
    filteredProducts = applyInventoryStatusFilter(
      filteredProducts,
      selectedInventory
    );

    setDisplayProducts(filteredProducts);
    setSelectedInventoryStatus(selectedInventory);
    setCurrentPage(1);
  };

  const applyCategoryFilter = (products, category) => {
    if (category === "") {
      // If no category is selected, return all products
      return products;
    } else {
      // Filter products based on the selected category
      return products.filter((product) =>
        product.categories.some((cat) => cat.name === category)
      );
    }
  };

  const applyInventoryStatusFilter = (products, inventoryStatus) => {
    if (inventoryStatus === "") {
      // If no inventory status is selected, return all products
      return products;
    } else if (inventoryStatus === "Sold Out") {
      // Filter products with zero inventory
      return products.filter((product) => !product.inventory);
    } else if (inventoryStatus === "In Stock") {
      // Filter products with inventory
      return products.filter((product) => product.inventory);
    }
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <PageSubtitle subtitle="Admin - Products" />
      <h3>Products</h3>
      <div className="text-center mt-4">
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
                  <Button
                    variant="outline-danger"
                    className="ms-4"
                    onClick={deleteProduct}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="ms-4"
                    onClick={() => setConfirmDelete(false)}
                  >
                    No
                  </Button>
                </Alert>
              )}
              <Link
                to={`/product/edit/${selectedProduct.id}`}
                state={{ product: selectedProduct }}
              >
                <Button className="custom-button">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </Link>
              <Button
                variant="danger"
                className="ms-3"
                onClick={deleteProductConfirm}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-center">
        <Form>
          <Form.Group
            className="mt-5 form-input-group mx-auto text-center"
            controlId="category"
          >
            <Form.Label className="h6">Filter by Category</Form.Label>
            <Form.Select
              aria-label="Category select"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">all categories</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat.id}>{cat.name}</option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group
            className="mt-5 form-input-group mx-auto text-center"
            controlId="inventory"
          >
            <Form.Label className="h6">Filter by Inventory</Form.Label>
            <Form.Select
              aria-label="Inventory select"
              name="inventory"
              value={selectedInventoryStatus}
              onChange={handleInventoryStatusChange}
            >
              <option value="">all products</option>
              <option value="Sold Out">sold out</option>
              <option value="In Stock">in stock</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
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
        {currentDisplayProducts.map((product) => (
          <AdminProductItem
            key={product.id}
            product={product}
            onClick={(bp, promotions) =>
              showProductModal(bp, product, promotions)
            }
          />
        ))}
      </Container>
      <nav className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          {Array.from({
            length: Math.ceil(displayProducts.length / itemsPerPage),
          }).map((_, index) => (
            <li key={index} className="page-item">
              <button
                className="page-link custom-button"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <FooterBuffer />
    </>
  );
}
