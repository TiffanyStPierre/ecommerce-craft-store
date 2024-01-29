import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";

export default function ProductList() {
  const { category } = useParams();

  return (
    <>
      <h1>Product List Page</h1>
      <ProductListItem />
    </>
  );
}
