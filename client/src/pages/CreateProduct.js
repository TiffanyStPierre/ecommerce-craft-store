import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateProduct() {
  return (
    <>
      <h2 className="page-subtitle">Admin - New Product</h2>
      <Form>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" as="textarea" rows={5} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Category</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImageUrl">
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control type="text" />
          <Form.Text className="text-muted">
            Image URL from image storage host. Image size must be 640px x 427px
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productThumbnailUrl">
          <Form.Label>Thumbnail Image URL</Form.Label>
          <Form.Control type="text" />
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
