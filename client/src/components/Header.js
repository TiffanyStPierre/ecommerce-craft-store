import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Button,
  Nav,
  Navbar,
  Offcanvas,
  Badge,
} from "react-bootstrap";
import "../styles/header.css";

export default function Header() {
  const [offcanvasShow, setOffcanvasShow] = useState(false);

  const { cartItems } = useContext(CartContext);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const hideOffCanvas = () => {
    setOffcanvasShow(false);
  }

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
                  {cartItems.length !== 0 && (
                    <Badge
                      pill
                      bg="danger"
                      id="navbar-badge"
                      className="navbar-badge"
                    >
                      {totalQuantity}
                    </Badge>
                  )}
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
                <SearchBar hideOffCanvas={hideOffCanvas} />

                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink
                    to="products/knitting"
                    className="link mb-4 h4"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    30% Off Knitting Sale
                  </NavLink>
                  <NavLink
                    to="products/all"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    All Products
                  </NavLink>
                  <NavLink
                    to="products/knitting"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    Knitting
                  </NavLink>
                  <NavLink
                    to="products/sewing"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    Sewing
                  </NavLink>
                  <NavLink
                    to="products/diy-kits"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    DIY Kits
                  </NavLink>
                  <NavLink
                    to="products/painting"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    Painting
                  </NavLink>
                  <NavLink
                    to="products/cross-stitch"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    Cross Stitch
                  </NavLink>
                  <NavLink
                    to="products/kids"
                    className="link mb-2 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
                    Kids
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className="link mt-4 h5"
                    onClick={() => setOffcanvasShow(!offcanvasShow)}
                  >
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
