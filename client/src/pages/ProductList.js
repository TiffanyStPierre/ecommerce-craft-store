import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";
import { useLoading } from "../context/LoadingContext";
import LoadingIndicator from "../components/LoadingIndicator";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const { isLoading, setIsLoading } = useLoading();

  let displayCategory;

  switch(category) {
    case "kids":
    displayCategory = "Kids";
    break;
    case "knitting":
    displayCategory = "Knitting";
    break;
    case "sewing":
    displayCategory = "Sewing";
    break;
    case "diy-kits":
    displayCategory = "DIY Kits";
    break;
    case "painting":
    displayCategory = "Painting";
    break;
    case "cross-stitch":
    displayCategory = "Cross Stitch";
    break;
    case "all":
    displayCategory = "All Products";
    break;
    default:
    displayCategory = "Search Results";
  }

  useEffect(() => {

    setIsLoading(true);

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
          setIsLoading(false);
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
      <h2 className="page-subtitle">{`${displayCategory}`}</h2>
      {isLoading && (
        <LoadingIndicator />
      )}
      <div className="mx-auto" style={{ width: "85%" }}>
        {products.length > 0 ? (
          <div className="d-flex flex-wrap align-items-center justify-content-around">
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

