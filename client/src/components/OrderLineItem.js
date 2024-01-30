import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function OrderLineItem(props) {
  return (
    <Container>
      <Row>
        <Col>{props.product.product.name}</Col>
        <Col>{props.product.product_quantity}</Col>
        <Col>${props.product.product.price}</Col>
        <Col>${props.product.product_quantity * props.product.product.price}</Col>
      </Row>
    </Container>
  );
}
