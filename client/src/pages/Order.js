import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Order() {

  const { id } = useParams();
  const [order, setOrder] = useState([]);

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
    </>
  );
}