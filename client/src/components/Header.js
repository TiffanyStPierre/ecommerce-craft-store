import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
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
              <Button className="custom-button">Admin Dashboard</Button>
              <Navbar.Brand>
                <NavLink to="/" className="link">
                  <h1>Craft Market</h1>
                </NavLink>
              </Navbar.Brand>
              <div className="navbar-icons">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="navbar-icon"
                  size="2x"
                />
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
              </div>
            </div>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
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
                  />
                  <Button className="custom-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink to="/knitting" className="link mb-4 h4">
                      30% Off Knitting Sale
                  </NavLink>
                  <NavLink to="/knitting" className="link mb-2 h5">Knitting</NavLink>
                  <NavLink to="/sewing" className="link mb-2 h5">Sewing</NavLink>
                  <NavLink to="/diy-kits" className="link mb-2 h5">DIY Kits</NavLink>
                  <NavLink to="/painting" className="link mb-2 h5">Painting</NavLink>
                  <NavLink to="/cross-stitch" className="link mb-2 h5">Cross Stitch</NavLink>
                  <NavLink to="/kids" className="link mb-2 h5">Kids</NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Navbar>
      ))}
    </>
  );
}
