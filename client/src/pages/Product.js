import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProduct();
  }, [id]); // Include category in the dependency array to re-run the effect when it changes

  return (
    <>
      <h2 className="page-subtitle">{product.name}</h2>
      <div className="d-flex mx-auto my-5 align-items-center justify-content-around" style={{ width: "70%" }}>
        <img src={product.image_url} alt={product.name} className="rounded" style={{ width: "45%" }}/>
        <div className="d-flex flex-column align-items-start" style={{ width: "45%" }}>
          <h3>{product.name}</h3>
          <h3 className="my-1">${product.price}</h3>
          <Button className="custom-button my-4">Add to Cart</Button>
        </div>
      </div>
      <h4>Similar products you may like</h4>
      <div className="page-footer-buffer"></div>
    </>
  );
}
