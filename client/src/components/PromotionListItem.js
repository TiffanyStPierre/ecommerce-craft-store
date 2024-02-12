import { Card, Col, Row, Badge } from "react-bootstrap";
import "../styles/admin.css";

export default function PromotionListItem(props) {
  return (
    <>
      {/* Displayed on smaller screens */}

      <Row
        className="mb-2 d-md-none mx-auto admin-product-item"
        onClick={() => props.onClick("sm-down", props.promotion)}
      >
        <Col xs={12} sm={12} md={12} lg={12} className="mx-auto">
          <Card className="admin-product-card mx-auto">
            <Card.Body>
              <Card.Header className="text-center" as="h4">
                {props.promotion.name}
              </Card.Header>
              <Card.Title className="text-center my-3">
                {Math.round(props.promotion.percent_discount)}% Discount
              </Card.Title>
              <Card.Subtitle className="text-center my-1">
                Start Date:{" "}
                {props.promotion.start_date
                  ? props.promotion.start_date
                  : "None"}
                <br />
                End Date:{" "}
                {props.promotion.end_date ? props.promotion.end_date : "None"}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Displayed on larger screens */}
      <Row
        className="mb-3 d-none d-md-flex align-items-center border rounded p-2 admin-product-item"
        onClick={() => props.onClick("sm-down", props.promotion)}
      >
        <Col xs={3} md={2} className="text-center">
          {props.promotion.name}
        </Col>
        <Col xs={3} md={3} className="text-center">
          {Math.round(props.promotion.percent_discount)}%
        </Col>
        <Col xs={3} md={2} className="text-center">
          {props.promotion.finished ? (
            <Badge bg="danger">Finished</Badge>
          ) : props.promotion.active ? (
            <Badge bg="success">Active</Badge>
          ) : props.promotion.upcoming ? (
            <Badge bg="secondary">Upcoming</Badge>
          ) : (
            ""
          )}
        </Col>
        <Col xs={3} md={3} className="text-center">
          {props.promotion.start_date ? props.promotion.start_date : "None"}
        </Col>
        <Col xs={3} md={2} className="text-center">
          {props.promotion.end_date ? props.promotion.end_date : "None"}
        </Col>
      </Row>
    </>
  );
}
