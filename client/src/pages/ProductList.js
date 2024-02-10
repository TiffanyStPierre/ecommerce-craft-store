import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";
import { useLoading } from "../context/LoadingContext";
import LoadingIndicator from "../components/LoadingIndicator";
import { Form } from "react-bootstrap";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { isLoading, setIsLoading } = useLoading();

  let displayCategory;

  switch (category) {
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
            category === "all"
              ? "/api/products"
              : `/api/categories/${category}`;
          const response = await axios.get(apiEndpoint);
          setProducts(response.data);
          setDisplayProducts(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, [category, location.state]); // Include category and location.state in the dependency array

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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "") {
      // If no category is selected, display all products
      setDisplayProducts(products);
    } else {
      // Filter products based on the selected category
      const filteredProducts = products.filter((product) =>
        product.categories.some((cat) => cat.name === selectedCategory)
      );
      setDisplayProducts(filteredProducts);
    }
  
    setSelectedCategory(selectedCategory);
    
  };

  return (
    <>
      <h2 className="page-subtitle">{`${displayCategory}`}</h2>
      {isLoading && <LoadingIndicator />}

      {category === "all" && (
        <Form className="mb-4">
          <Form.Group
            className="mt-5 form-input-group mx-auto text-center"
            controlId="category"
          >
            <Form.Label className="h6">Filter by Category</Form.Label>
            <Form.Select
              aria-label="Category select"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories &&
                categories.map((cat) => (
                  <option key={cat.id}>{cat.name}</option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      )}

      <div className="mx-auto" style={{ width: "85%" }}>
        {products.length > 0 ? (
          <div className="d-flex flex-wrap align-items-center justify-content-around">
            {displayProducts.map((product) => (
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
