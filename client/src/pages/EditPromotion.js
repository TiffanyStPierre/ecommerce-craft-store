import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export default function EditPromotion() {

  const location = useLocation();
  const { id } = useParams();

  const selectedPromotion = location.state.promotion;

  const [allProducts, setAllProducts] = useState([]);
  const [promotionData, setPromotionData] = useState({
    name: "",
    percent_discount: 0,
    start_date: null,
    end_date: null,
    products: [],
  });

  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const {
    name,
    percent_discount,
    start_date,
    end_date,
    products,
  } = promotionData;

  useEffect(() => {
    if (selectedPromotion) {
      setPromotionData({
        name: selectedPromotion.name,
        percent_discount: selectedPromotion.percent_discount,
        start_date: selectedPromotion.start_date,
        end_date: selectedPromotion.end_date,
        products: selectedPromotion.products,
      });
    }
  }, [selectedPromotion]);

  return (
    <>
      <h2 className="page-subtitle">Admin - Edit Promotion</h2>
      <h3 className="mb-5">Edit Promotion</h3>
      <div className="page-footer-buffer"></div>
      </>
  )
}