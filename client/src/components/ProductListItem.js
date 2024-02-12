import Button from "react-bootstrap/Button";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductListItem(props) {
  console.log(props.product);
  return (
    <Link to={`/product/${props.product.id}`} className="link">
      <Card
        style={{ width: "300px", height: "365px" }}
        className="my-4 mx-3 position-relative"
      >
        {props.product && !props.product.inventory && (
          <div className="position-absolute top-0 start-0 m-2">
            <Badge bg="danger">Sold Out</Badge>
          </div>
        )}
        <Card.Img
          variant="top"
          src={props.product.image_url}
          style={{ height: "225px", width: "350px" }}
        />

        <Card.Body className="d-flex flex-column align-items-center bg-light">
          <Card.Title className="text-center fs-6">
            {props.product.name}
          </Card.Title>
          <Card.Text className="mb-3 mt-1 fs-6">
            ${props.product.sale_price_info.name !== "Regular Price" ? props.product.sale_price_info.sale_price : props.product.price}
          </Card.Text>
          <Button className="custom-button mb-2">Details</Button>
        </Card.Body>
      </Card>
    </Link>
  );
}
