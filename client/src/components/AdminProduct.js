import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "react-bootstrap";
import "../styles/admin.css";

export default function AdminProduct(props) {

  const promotions = props.product.promotions;

  // Check if promotions array exists and has length
  const promotionNames = promotions && promotions.length
    ? promotions.map(promotion => promotion.name).join(', ')
    : "No Promotions";

  return (
    <>
      {/* Displayed on smaller screens */}
      <Row className="mb-2 d-md-none mx-auto">
        <Col xs={10} sm={10} md={8} lg={8} className="mx-auto">
          <Card className="admin-product-card mx-auto">
            <Card.Img variant="top" src={props.product.thumbnail_url} alt={props.product.name} />
            <Card.Body>
              <Card.Title className="text-center">{props.product.name}</Card.Title>
              <Card.Text className="text-center">{props.product.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Displayed on larger screens */}
      <Row className="mb-3 d-none d-md-flex align-items-center border rounded p-2">
        <Col xs={3} md={2} className="text-center">
          <img src={props.product.thumbnail_url} alt={props.product.name} style={{ height: "100%", width: "100%", objectFit: "cover" }} className="rounded-circle" />
        </Col>
        <Col xs={3} md={2} className="text-center">
          {props.product.name}
        </Col>
        <Col xs={2} md={2} className="text-center">
          ${props.product.price}
        </Col>
        <Col xs={2} md={2} className="text-center">
          Category
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
