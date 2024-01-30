import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({
    id: "",
    customer_id: "",
    customer: {},
    order_date: "",
    products: [],
    shipped_date: "",
    subtotal_amount: "",
    tax_amount: "",
    total_amount: "",
    updated_at: "",
    created_at: "",
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
        </div>
      </div>
    </>
  );
}
