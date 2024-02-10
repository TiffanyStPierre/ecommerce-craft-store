import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useLoading } from "../context/LoadingContext";
import LoadingIndicator from "../components/LoadingIndicator";

export default function EditPromotion() {
  const location = useLocation();
  const { id } = useParams();

  const { isLoading, setIsLoading } = useLoading();

  const selectedPromotion = location.state.promotion;

  const [allProducts, setAllProducts] = useState([]);

  const [promotionData, setPromotionData] = useState({
    name: "",
    percent_discount: 0,
    start_date: null,
    end_date: null,
    products: selectedPromotion
      ? selectedPromotion.products.map((prod) => prod.id)
      : [],
  });

  const [checkboxesChecked, setCheckboxesChecked] = useState({});

  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const { name, percent_discount, start_date, end_date, products } =
    promotionData;

    useEffect(() => {
      if (selectedPromotion) {
        setPromotionData({
          name: selectedPromotion.name,
          percent_discount: selectedPromotion.percent_discount,
          start_date: selectedPromotion.start_date,
          end_date: selectedPromotion.end_date,
          products: selectedPromotion.products.map((prod) => prod.id),
        });
  
        // Initialize checkboxesChecked based on selectedPromotion.products
        const initialCheckboxesChecked = {};
        selectedPromotion.products.forEach(prod => {
          initialCheckboxesChecked[prod.id] = true;
        });
        setCheckboxesChecked(initialCheckboxesChecked);
      }
    }, [selectedPromotion]);

  useEffect(() => {

    setIsLoading(true);

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setAllProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const onChange = (e) => {
    setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (productId) => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      [productId]: !checkboxesChecked[productId],
    });

    // Update promotionData.products based on checkboxesChecked
    const updatedProducts = Object.keys(checkboxesChecked)
      .filter((id) => checkboxesChecked[id])
      .map((id) => parseInt(id));

    setPromotionData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const onSubmit = (e) => {};

  return (
    <>
      <h2 className="page-subtitle">Admin - Edit Promotion</h2>
      {isLoading && <LoadingIndicator />}
      <h3 className="mb-5">Edit Promotion</h3>
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
            {allProducts.map((prod) => (
              <Form.Check
                key={prod.id}
                type="checkbox"
                id={prod.id}
                label={prod.name}
                className="form-checkbox"
                checked={checkboxesChecked[prod.id]}
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
            Save Changes
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
