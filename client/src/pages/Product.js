import {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Product() {

  const { id } = useParams();

  return (
    <h1>Product Page</h1>
  )
}