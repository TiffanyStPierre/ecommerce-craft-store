import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "80vh" }}>
      <h2 className="page-subtitle">Admin Dashboard</h2>
      <div
        className="d-flex flex-grow-1 mx-auto align-items-center justify-content-around"
        style={{ width: "70%" }}
      >
        <Link to="/admin/products" className="link">
          <Card className="py-4">
            <Card.Body>
              <Card.Title className="text-center">Products</Card.Title>
              <Card.Text>Click here to view and manage products</Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/admin/promotions" className="link">
          <Card className="py-4">
            <Card.Body>
              <Card.Title className="text-center">Promotions</Card.Title>
              <Card.Text>Click here to view and manage promotions</Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/admin/orders" className="link">
          <Card className="py-4">
            <Card.Body>
              <Card.Title className="text-center">Orders</Card.Title>
              <Card.Text>Click here to view and manage orders</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
      <div className="page-footer-buffer"></div>
    </div>
  );
}
