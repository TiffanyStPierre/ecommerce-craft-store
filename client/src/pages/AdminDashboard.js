import Card from "react-bootstrap/Card";

export default function AdminDashboard() {
  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard</h2>
      <div className="d-flex mx-auto align-items-center justify-content-around" style={{width: "70%"}}>
      <Card>
        <Card.Body>
          <Card.Title>Products</Card.Title>
          <Card.Text>
            Click here to view and manage products
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Promotions</Card.Title>
          <Card.Text>
          Click here to view and manage promotions
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Orders</Card.Title>
          <Card.Text>
          Click here to view and manage orders
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </>
  );
}
