import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "react-bootstrap";
import "../styles/admin.css";

export default function AdminProduct(props) {

  return (
    <>
      {/* Displayed on smaller screens */}
      <Row className="mb-2 d-md-none">
        <Col xs={12} sm={12} md={8} lg={8}>
          <Card className="admin-product-card">
            <Card.Img variant="top" src={props.product.thumbnail_url} alt={props.product.name} />
            <Card.Body>
              <Card.Title>{props.product.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Displayed on larger screens */}
      <Row className="mb-3 d-none d-md-flex">
        <Col>
          <img src={props.product.thumbnail_url} alt={props.product.name} style={{ height: "100px", width: "100%" }} className="rounded-circle" />
        </Col>
        <Col>
          {props.product.name}
        </Col>
        <Col>
          ${props.product.price}
        </Col>
        <Col>
          Category
        </Col>
        <Col>
          {props.product.inventory}
        </Col>
        <Col>
          Promotions
        </Col>
      </Row>
    </>
  );
}
