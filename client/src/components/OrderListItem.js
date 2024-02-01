import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderListItem(props) {
  return (
    <>
      {/* Displayed on smaller screens */}
      <Link to={`/order/${props.order.id}`} className="link">
        <Row className="mb-2 d-md-none mx-auto admin-order-item">
          <Col xs={10} sm={8} md={8} lg={8} className="mx-auto">
            <Card className="mx-auto">
              <Card.Body>
                <Card.Title className="text-center">
                  Invoice #{props.order.id}
                </Card.Title>
                <Card.Text className="text-center my-2">
                  Customer: {props.order.customer.first_name}{" "}
                  {props.order.customer.last_name}
                </Card.Text>
                <Card.Text className="text-center">
                  Total: {props.order.total_amount}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Link>
      {/* Displayed on larger screens */}
      <Link to={`/order/${props.order.id}`} className="link">
        <Row className="mb-3 d-none d-md-flex align-items-center border rounded p-2 admin-order-item">
          <Col xs={2} md={2} className="text-center">
            {props.order.id}
          </Col>
          <Col xs={3} md={3} className="text-center">
            {props.order.customer.first_name} {props.order.customer.last_name}
          </Col>
          <Col xs={2} md={2} className="text-center">
            {props.order.order_date}
          </Col>
          <Col xs={3} md={3} className="text-center">
            ${props.order.total_amount}
          </Col>
          <Col xs={2} md={2} className="text-center">
            {props.order.shipped_date}
          </Col>
        </Row>
      </Link>
    </>
  );
}
