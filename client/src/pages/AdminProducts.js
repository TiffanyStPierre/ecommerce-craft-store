import { useState, useEffect } from "react";
import axios from "axios";
import AdminProduct from "../components/AdminProduct";
import Table from "react-bootstrap/Table";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchProducts();
  }, []);

  return (
    <>
      <h2 className="page-subtitle">Admin Dashboard - Product List</h2>
      <h3>Products</h3>
      <Table striped bordered size="sm" className="mt-5 mx-auto" style={{width: "70%"}}>
        <thead>
          <tr>
            <th></th>
            <th className="h5">Name</th>
            <th className="h5">Price</th>
            <th className="h5">Category</th>
            <th className="h5">Inventory</th>
            <th className="h5">Promotions</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <AdminProduct key={product.id} product={product} />
          ))}
        </tbody>
      </Table>
      <div className="page-footer-buffer"></div>
    </>
  );
}
