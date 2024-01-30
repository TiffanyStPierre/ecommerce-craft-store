import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchOrders function on page load
    fetchOrders();
  }, []);

  return (
    <div></div>
  )
}