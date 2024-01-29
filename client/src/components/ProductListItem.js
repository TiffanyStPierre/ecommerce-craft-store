import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProductListItem(props) {
  return (
    <Card style={{ width: '350px', height: '400px' }} className="m-4">
      <Card.Img variant="top" src={props.product.image_url} style={{height: '225px', width: '350px'}}/>
      <Card.Body className="d-flex flex-column align-items-center bg-light">
        <Card.Title className="text-center">{props.product.name}</Card.Title>
        <Card.Text className="mb-4 mt-2 fs-5">
          ${props.product.price}
        </Card.Text>
        <Button className="custom-button mb-2">Details</Button>
      </Card.Body>
    </Card>
  )
}