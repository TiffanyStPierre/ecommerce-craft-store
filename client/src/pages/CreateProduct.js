import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
    thumbnailUrl: "",
  });

  const {
    name,
    description,
    price,
    category,
    imageUrl,
    thumbnailUrl,
  } = productData;

  const onChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

  }

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
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="name" value={name} onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" as="textarea" rows={5} name="description" value={description} onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={price} onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Product Category</Form.Label>
          <Form.Select aria-label="Category select" name="category" value={category} onChange={onChange}>
            {categories &&
              categories.map((category) => <option>{category.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control type="text" name="imageUrl" value={imageUrl} onChange={onChange} />
          <Form.Text className="text-muted">
            Image URL from image storage host. Image size must be 640px x 427px
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="thumbnailUrl">
          <Form.Label>Thumbnail Image URL</Form.Label>
          <Form.Control type="text" name="thumbnailUrl" value={thumbnailUrl} onChange={onChange} />
          <Form.Text className="text-muted">
            Thumbnail image URL from image storage host. Image size must be
            200px x 200px
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="custom-button">
          Create Product
        </Button>
      </Form>
      <div className="page-footer-buffer"></div>
    </>
  );
}
