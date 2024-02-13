import React from "react";
import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import "../styles/cart.css";

export default function CartLineItem(props) {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <Container>
      <Row className="my-2 d-none d-md-flex align-items-center p-2 admin-product-item">
        <Col xs={3} md={2}>
          <img
            src={props.product.thumbnail_url}
            alt={props.product.name}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            className="rounded-circle"
          />
        </Col>
        <Col>{props.product.name}</Col>
        <Col>{props.product.quantity}</Col>
        <Col>${props.product.sale_price_info.sale_price}</Col>
        <Col>${props.product.quantity * props.product.sale_price_info.sale_price}</Col>
        <Col>
          <Button 
          className="custom-button"
          onClick={() => addToCart(props.product)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button
            variant="danger"
            className="ms-3"
            onClick={() => removeFromCart(props.product)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
