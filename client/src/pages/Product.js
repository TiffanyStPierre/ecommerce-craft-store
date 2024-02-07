import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button} from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);

        // Fetch similar products
      const similarProductsResponse = await axios.get(`/api/similar_products/${id}`);
      setSimilarProducts(similarProductsResponse.data);
      console.log(similarProductsResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProduct function on page load
    fetchProduct();
  }, [id]);

  return (
    <>
      <h2 className="page-subtitle">{product.name}</h2>
      <div className="d-flex mx-auto my-5 align-items-center justify-content-around" style={{ width: "70%" }}>
        <img src={product.image_url} alt={product.name} className="rounded" style={{ width: "45%" }}/>
        <div className="d-flex flex-column align-items-start" style={{ width: "45%" }}>
          <h3>{product.name}</h3>
          <h3 className="my-1">${product.price}</h3>
          <Button className="custom-button my-4" onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
      <p className="w-50 mx-auto mb-5 h6">{product.description}</p>
      <h4>Similar products you may like</h4>
      <div className="page-footer-buffer"></div>
    </>
  );
}
