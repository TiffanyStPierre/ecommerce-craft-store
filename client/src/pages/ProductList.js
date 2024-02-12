import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";
import { useLoading } from "../context/LoadingContext";
import LoadingIndicator from "../components/LoadingIndicator";
import { Form, Row, Col, Container } from "react-bootstrap";
import PageSubtitle from "../components/PageSubtitle";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Number of items per page

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

  // Calculate index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayProducts = displayProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setIsLoading(true);

    const fetchProducts = async () => {
      try {
        // Check if there are search results in the route state
        const searchResults = location.state?.searchResults;

        if (searchResults && searchResults.length > 0) {
          // Use search results if available
          setProducts(searchResults);
          setDisplayProducts(searchResults);
          setIsLoading(false);
        } else {
          // Otherwise, fetch products based on the category
          const apiEndpoint =
            category === "all"
              ? "/api/products"
              : `/api/categories/${category}`;
          const response = await axios.get(apiEndpoint);
          setProducts(response.data);
          setDisplayProducts(response.data);
          setCurrentPage(1);
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
    setCurrentPage(1);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <PageSubtitle subtitle={`${displayCategory}`} />
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
              <option value="">all products</option>
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
            {currentDisplayProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No search results or products available for this category.</p>
        )}
      </div>
      <nav className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          {Array.from({
            length: Math.ceil(displayProducts.length / itemsPerPage),
          }).map((_, index) => (
            <li key={index} className="page-item">
              <button
                className="page-link custom-button"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="page-footer-buffer"></div>
    </>
  );
}
