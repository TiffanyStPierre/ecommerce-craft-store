import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image_url: "",
    thumbnail_url: "",
  });
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const { name, description, price, category, image_url, thumbnail_url } =
    productData;

  // Use useEffect to set the initial category value when categories change
  useEffect(() => {
    if (categories.length > 0) {
      setProductData((prevState) => ({
        ...prevState,
        category: categories[0].name, // Set to the name of the first category
      }));
    }
  }, [categories]);

  const onChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(productData);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProductData((prevState) => ({
      ...prevState,
      category: selectedCategory,
    }));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    navigate("/admin/products");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/product/new", productData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          handleShow();
          setFormError(false);
          setProductData({
            name: "",
            description: "",
            price: 0,
            category: "",
            image_url: "",
            thumbnail_url: "",
          })
        } else {
          setFormError(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

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

  return (
    <>
      <h2 className="page-subtitle">Admin - New Product</h2>
      <h3 className="mb-5">Create New Product</h3>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postForm.ControlTextarea">
              <Form.Label>
                Your new product was successfully created.
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {formError && (
        <Alert variant="danger" className="text-center">
          There was a problem creating your product. Please make sure all fields
          are filled in and try again.
        </Alert>
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-4 form-input-group mx-auto" controlId="name">
          <Form.Label>Product Name</Form.Label>
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
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            name="description"
            value={description}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-4 form-input-group mx-auto" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={price}
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            Enter a number here. No dollar sign.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-4 form-input-group mx-auto"
          controlId="category"
        >
          <Form.Label>Product Category</Form.Label>
          <Form.Select
            aria-label="Category select"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories &&
              categories.map((cat) => <option key={cat.id}>{cat.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-4 form-input-group mx-auto"
          controlId="image_url"
        >
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={image_url}
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            Image URL from image storage host. Image size must be 640px x 427px
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-4 form-input-group mx-auto"
          controlId="thumbnail_url"
        >
          <Form.Label>Thumbnail Image URL</Form.Label>
          <Form.Control
            type="text"
            name="thumbnail_url"
            value={thumbnail_url}
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            Thumbnail image URL from image storage host. Image size must be
            200px x 200px
          </Form.Text>
        </Form.Group>
        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="custom-button mt-5"
          >
            Create Product
          </Button>
        </div>
      </Form>
      {formError && (
        <Alert variant="danger" className="text-center mt-4">
          There was a problem creating your product. Please make sure all fields
          are filled in and try again.
        </Alert>
      )}
      <div className="page-footer-buffer"></div>
    </>
  );
}
