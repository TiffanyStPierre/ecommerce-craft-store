import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import SimilarProduct from "../components/SimilarProduct";
import "../styles/product.css";
import PageSubtitle from "../components/PageSubtitle";
import FooterBuffer from "../components/FooterBuffer";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
        console.log(response.data);

        // Fetch similar products
        const similarProductsResponse = await axios.get(
          `/api/similar_products/${id}`
        );
        setSimilarProducts(similarProductsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProduct function on page load
    fetchProduct();
  }, [id]);

  const onClick = (product) => {
    addToCart(product);
    handleShow(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <PageSubtitle subtitle={product.name} />
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postForm.ControlTextarea">
              <Form.Label>This item was added to your cart.</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="d-flex mx-auto my-5 align-items-center justify-content-around product-details">
        <img
          src={product.image_url}
          alt={product.name}
          className="rounded"
          style={{ width: "45%" }}
        />
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "45%" }}
        >
          <h3 className="product-details-title">{product.name}</h3>

          {product &&
            product.sale_price_info &&
            product.sale_price_info.name !== "Regular Price" && (
              <>
              <p className="mt-3">Regular price: ${product.price}</p>
                <Alert variant="danger" className="mt-3 py-1 px-4">
                  On Sale!
                </Alert>
              </>
            )}
          <h3 className="my-1 product-details-title">
            $
            {product &&
            product.sale_price_info &&
            product.sale_price_info.name !== "Regular Price"
              ? product.sale_price_info.sale_price
              : product.price}
          </h3>
          {product.inventory !== 0 && (
            <Button
              className="custom-button mt-4"
              onClick={() => onClick(product)}
            >
              Add to Cart
            </Button>
          )}
          {product.inventory === 0 && (
            <Button variant="secondary" className="mt-4">
              Sold Out
            </Button>
          )}
          <Button
            className="secondary-button mt-4"
            onClick={() => navigate(-1)}
          >
            Return to Product List
          </Button>
        </div>
      </div>
      <p className="mx-auto mb-5 product-description">{product.description}</p>
      <h4 className="similar-products-heading">
        Similar products you may like
      </h4>
      <div
        className="d-flex mt-5 mx-auto justify-content-center similar-products-container"
        style={{ width: "90%" }}
      >
        {similarProducts.map((product) => (
          <SimilarProduct key={product.id} product={product} />
        ))}
      </div>
      <FooterBuffer />
    </>
  );
}
