import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { Form, Button, Alert } from "react-bootstrap";

export default function SearchBar(props) {
  const {
    handleSubmit,
    handleChange,
    inputValue,
    setInputValue,
    showNoResults,
    setShowNoResults,
  } = useContext(SearchContext);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(e);
    if (typeof props.hideOffCanvas === "function") {
      props.hideOffCanvas();
    }
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          id="search"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchSubmit(e);
            }
          }}
        />
        <Button className="custom-button" onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Form>
      {showNoResults && (
        <Alert className="danger">
          No products found. Please search again.
        </Alert>
      )}
    </>
  );
}
