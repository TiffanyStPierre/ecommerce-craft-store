import { Card, Col, Row } from "react-bootstrap";
import "../styles/admin.css";

export default function PromotionListItem(props) {
  

  return (
    <>
      {/* Displayed on smaller screens */}

      <Row
        className="mb-2 d-md-none mx-auto admin-product-item"
      >
        <Col xs={12} sm={12} md={12} lg={12} className="mx-auto">
          <Card className="admin-product-card mx-auto">
            <Card.Body>
              <Card.Header className="text-center">
              Name
              </Card.Header>
              <Card.Title className="text-center">
              Discount
              </Card.Title>
              <Card.Subtitle className="text-center">
                Start Date: End Date:
              </Card.Subtitle>
              <Card.Subtitle className="text-center">
                Products
              </Card.Subtitle>
              <Card.Text className="text-center">
                List of Products
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Displayed on larger screens */}
      <Row
        className="mb-3 d-none d-md-flex align-items-center border rounded p-2 admin-product-item"
      >
        <Col xs={3} md={2} className="text-center">
          Name
        </Col>
        <Col xs={2} md={2} className="text-center">
          Discount
        </Col>
        <Col xs={2} md={2} className="text-center">
          Start Date
        </Col>
        <Col xs={1} md={2} className="text-center">
          End Date
        </Col>
      </Row>
    </>
  );
}
