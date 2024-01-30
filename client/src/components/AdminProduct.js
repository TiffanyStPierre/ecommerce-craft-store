import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AdminProduct(props) {
  return (
    <tr>
      <td>
        <img src={props.product.thumbnail_url} alt={props.product.name} style={{height: "100px", width: "100px"}} className="rounded-circle"/>
      </td>
      <td>{props.product.name}</td>
      <td>${props.product.price}</td>
      <td>Category</td>
      <td>{props.product.inventory}</td>
      <td>Promotions</td>
      <td><FontAwesomeIcon icon={faPen} /></td>
      <td><FontAwesomeIcon icon={faTrash} className="text-danger"/></td>
    </tr>
  );
}
