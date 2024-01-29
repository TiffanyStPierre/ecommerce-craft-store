import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProductListItem(props) {
  return (
    <Card style={{ width: '250px' }}>
      <Card.Img variant="top" src={props.product.thumbnail_url} style={{height: '250px'}}/>
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-center">{props.product.name}</Card.Title>
        <Card.Text className="mb-3">
          ${props.product.price}
        </Card.Text>
        <Button className="custom-button mb-2">Details</Button>
      </Card.Body>
    </Card>
  )
}