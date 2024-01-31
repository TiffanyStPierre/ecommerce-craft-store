import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if there are search results in the route state
        const searchResults = location.state?.searchResults;

        if (searchResults && searchResults.length > 0) {
          // Use search results if available
          setProducts(searchResults);
        } else {
          // Otherwise, fetch products based on the category
          const apiEndpoint =
            category === "all" ? "/api/products" : `/api/categories/${category}`;
          const response = await axios.get(apiEndpoint);
          setProducts(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, [category, location.state]); // Include category and location.state in the dependency array

  return (
    <>
      <h2 className="page-subtitle">Product List Page</h2>
      <div className="mx-auto" style={{ width: "70%" }}>
        {products.length > 0 ? (
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No search results or products available for this category.</p>
        )}
      </div>
      <div className="page-footer-buffer"></div>
    </>
  );
}

