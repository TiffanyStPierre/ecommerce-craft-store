import { Card, Col, Row } from "react-bootstrap";
import "../styles/admin.css";

export default function AdminProductItem(props) {
  
  const promotions = props.product.promotions;

  // Check if promotions array exists and has length
  const promotionNames =
    promotions && promotions.length
      ? promotions.map((promotion) => promotion.name).join(", ")
      : "No Promotions";

  const category = props.product.categories[0].name;

  return (
    <>
      {/* Displayed on smaller screens */}

      <Row
        className="mb-2 d-md-none mx-auto admin-product-item"
        onClick={() => props.onClick("sm-down", promotionNames)}
      >
        <Col xs={10} sm={8} md={8} lg={8} className="mx-auto">
          <Card className="admin-product-card mx-auto">
            <Card.Img
              variant="top"
              src={props.product.thumbnail_url}
              alt={props.product.name}
            />
            <Card.Body>
              <Card.Title className="text-center">
                {props.product.name}
              </Card.Title>
              <Card.Text className="text-center">
                {props.product.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Displayed on larger screens */}
      <Row
        className="mb-3 d-none d-md-flex align-items-center border rounded p-2 admin-product-item"
        onClick={() => props.onClick("sm-down", promotionNames)}
      >
        <Col xs={3} md={2} className="text-center">
          <img
            src={props.product.thumbnail_url}
            alt={props.product.name}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            className="rounded-circle"
          />
        </Col>
        <Col xs={3} md={2} className="text-center">
          {props.product.name}
        </Col>
        <Col xs={2} md={2} className="text-center">
          ${props.product.price}
        </Col>
        <Col xs={2} md={2} className="text-center">
          {category}
        </Col>
        <Col xs={1} md={2} className="text-center">
          {props.product.inventory}
        </Col>
        <Col xs={1} md={2} className="text-center">
          {promotionNames}
        </Col>
      </Row>
    </>
  );
}
