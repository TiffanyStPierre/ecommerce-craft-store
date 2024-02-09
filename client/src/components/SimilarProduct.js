import { Link } from "react-router-dom";

export default function SimilarProduct(props) {
  return (
    <Link to={`/product/${props.product.id}`} className="similar-products-item link">
      <img className="rounded-circle similar-product-image" src={props.product.thumbnail_url} alt={props.product.name}/>
      <p className="h6 text-center mt-2 similar-product-text">{props.product.name}</p>
    </Link>
  )
}