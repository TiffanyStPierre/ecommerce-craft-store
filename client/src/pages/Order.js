import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderLineItem from "../components/OrderLineItem";

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({
    order: {},
    customer: {},
    products_with_quantity: [],
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/order/${id}`);
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchOrder function on page load
    fetchOrder();
  }, [id]);

  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard - Order Details</h2>
      <h3>Customer Order Details</h3>
      <div>
        <div>
          <h4>Customer</h4>
          <p>
            {order.customer.first_name} {order.customer.last_name}
            <br />
            {order.customer.street_address}
            <br />
            {order.customer.city}, {order.customer.province}
            <br />
            {order.customer.postal_code}
          </p>
        </div>
        <div>
          <h4>Order Date</h4>
          <p>{order.order.order_date}</p>
        </div>
        <div>
          <h4>Invoice #</h4>
          <p>{order.order.id}</p>
        </div>
        <div>
          <h4>Order Total</h4>
          <p>${order.order.total_amount}</p>
        </div>
        <div>
          <h4>Items Ordered</h4>
          <h5>Item</h5>
          <h5>Quantity</h5>
          <h5>Price</h5>
          <h5>Item Subtotal</h5>
        </div>
        {order.products_with_quantity.map((product, index) => (
          < OrderLineItem key={index} product={product}/>
        ))}
        <h4>Order Subtotal</h4>
        <h4>${order.order.subtotal_amount}</h4>
        <h4>Tax</h4>
        <h4>${order.order.tax_amount}</h4>
        <h4>Order Total</h4>
        <h4>${order.order.total_amount}</h4>
      </div>
    </>
  );
}
