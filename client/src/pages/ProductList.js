import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Construct the API endpoint based on the category
        const apiEndpoint = category === 'all' ? '/api/products' : `/api/products/${category}`;

        const response = await axios.get(apiEndpoint);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, [category]); // Include category in the dependency array to re-run the effect when it changes

  return (
    <>
      <h1>Product List Page</h1>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </>
  );
}
