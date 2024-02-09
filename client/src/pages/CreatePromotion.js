import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import "../styles/promotions.css";

export default function CreatePromotion() {
  const [allProducts, setAllProducts] = useState([]);
  const [promotionData, setPromotionData] = useState({
    name: "",
    percent_discount: 0,
    start_date: null,
    end_date: null,
    products: [],
  });
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const { name, percent_discount, start_date, end_date, products } =
    promotionData;

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    navigate("/admin/promotions");
  };

  const onChange = (e) => {
    setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (productId) => {
    // Check if the product is already in the array
    const updatedProducts = products.includes(productId)
      ? products.filter((id) => id !== productId) // If already selected, remove it
      : [...products, productId]; // If not selected, add it

    setPromotionData({ ...promotionData, products: updatedProducts });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/promotion/new", promotionData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          handleShow();
          setFormError(false);
          setPromotionData({
            name: "",
            percent_discount: 0,
            start_date: null,
            end_date: null,
            products: [],
          });
        } else {
          setFormError(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, []);

  return (
    <>
      <h2 className="page-subtitle">Admin - New Promotion</h2>
      <h3 className="mb-5">Create New Promotion</h3>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Promotion Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postForm.ControlTextarea">
              <Form.Label>
                Your new promotion was successfully created.
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {formError && (
        <Alert variant="danger" className="text-center">
          There was a problem creating your promotion. Please make sure all
          fields are filled in and try again.
        </Alert>
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-4 form-input-group mx-auto" controlId="name">
          <Form.Label>Promotion Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group
          className="mb-4 form-input-group mx-auto"
          controlId="description"
        >
          <Form.Label>Discount Percentage</Form.Label>
          <Form.Control
            type="number"
            name="percent_discount"
            value={percent_discount}
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            Enter a number here. No percentage sign.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4 form-input-group mx-auto" controlId="price">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            value={start_date}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group
          className="mb-4 form-input-group mx-auto"
          controlId="inventory"
        >
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            value={end_date}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group
          className="mb-4 form-input-group mx-auto"
          controlId="products"
        >
          <Form.Label className="h5 mt-3">Included Products</Form.Label>
          <div className="form-checkboxes mt-3">
            {allProducts &&
              allProducts.map((prod) => (
                <Form.Check
                  key={prod.id}
                  type="checkbox"
                  id={prod.id}
                  label={prod.name}
                  className="form-checkbox"
                  checked={products.includes(prod.id)}
                  onChange={() => handleCheckboxChange(prod.id)}
                />
              ))}
          </div>
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="custom-button mt-5"
          >
            Create Promotion
          </Button>
        </div>
      </Form>
      {formError && (
        <Alert variant="danger" className="text-center mt-4">
          There was a problem creating your promotion. Please make sure all
          fields are filled in and try again.
        </Alert>
      )}
      <div className="page-footer-buffer"></div>
    </>
  );
}
