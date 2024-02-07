import { Link } from "react-router-dom";

export default function SimilarProduct(props) {
  return (
    <Link to={`/product/${props.product.id}`} className="ms-5 link">
      <img className="rounded-circle" src={props.product.thumbnail_url} alt={props.product.name}/>
      <p className="h6 text-center mt-2">{props.product.name}</p>
    </Link>
  )
}