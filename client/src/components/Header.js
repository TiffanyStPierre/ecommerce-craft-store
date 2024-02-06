import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/header.css";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchParams((prevParams) => ({ ...prevParams, q: value }));
    setInputValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search`, { params: searchParams });
      const newResults = response.data;

      setSearchResults(newResults);
      setInputValue("");

      if (newResults.length === 0) {
        setShowNoResults(true);
      } else {
        setShowNoResults(false);
        setOffcanvasShow(false);
        navigate("/products/searchresults", {
          state: { searchResults: newResults },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-white w-100"
          sticky="top"
        >
          <div className="w-100">
            <div className="header">
              <NavLink to="/admin">
                <Button className="custom-button admin-header-button">
                  Admin
                </Button>
              </NavLink>
              <NavLink to="/" className="link text-center">
                <h1>Craft Market</h1>
              </NavLink>
              <div className="navbar-icons">
                <NavLink to="/cart">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="navbar-icon"
                    size="2x"
                  />
                </NavLink>
                <Navbar.Toggle
                  onClick={() => setOffcanvasShow(!offcanvasShow)} // Toggle Offcanvas show state
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
              </div>
            </div>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={offcanvasShow} // Set Offcanvas visibility
              onHide={() => setOffcanvasShow(false)} // Handle Offcanvas hide
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Craft Market
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form className="d-flex mb-4">
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
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button className="custom-button" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Form>

                {showNoResults && (
                  <Alert className="danger">
                    No products found. Please search again.
                  </Alert>
                )}

                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink to="products/knitting" className="link mb-4 h4">
                    30% Off Knitting Sale
                  </NavLink>
                  <NavLink to="products/knitting" className="link mb-2 h5">
                    Knitting
                  </NavLink>
                  <NavLink to="products/sewing" className="link mb-2 h5">
                    Sewing
                  </NavLink>
                  <NavLink to="products/diy-kits" className="link mb-2 h5">
                    DIY Kits
                  </NavLink>
                  <NavLink to="products/painting" className="link mb-2 h5">
                    Painting
                  </NavLink>
                  <NavLink to="products/cross-stitch" className="link mb-2 h5">
                    Cross Stitch
                  </NavLink>
                  <NavLink to="products/kids" className="link mb-2 h5">
                    Kids
                  </NavLink>
                  <NavLink to="/cart" className="link mt-4 h5">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="menu-icon me-2"
                      size="1x"
                    />
                    View Cart
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Navbar>
      ))}
    </>
  );
}
