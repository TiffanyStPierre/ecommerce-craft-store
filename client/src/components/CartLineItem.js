import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function CartLineItem(props) {
  return (
    <Container>
      <Row>
        <Col xs={3} md={2}><img
            src={props.product.thumbnail_url}
            alt={props.product.name}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            className="rounded-circle"
          /></Col>
        <Col>{props.product.name}</Col>
        <Col>{props.product.quantity}</Col>
        <Col>${props.product.price}</Col>
        <Col>${props.product.quantity * props.product.price}</Col>
      </Row>
    </Container>
  );
}
