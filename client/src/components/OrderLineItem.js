export default function OrderLineItem(props) {
  console.log(props.product)
  return (
    <div>
      <p>{props.product.product.name}</p>
      <p>{props.product.product_quantity}</p>
      <p>${props.product.product.price}</p>
      <p>${props.product.product_quantity * props.product.product.price}</p>
    </div>
  );
}