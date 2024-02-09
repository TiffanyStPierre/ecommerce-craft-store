import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PromotionListItem from "../components/PromotionListItem";
import { Container, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Promotions() {

  const [promotions, setPromotions] =useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("/api/promotions");
        setPromotions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchProducts function on page load
    fetchPromotions();
  }, []);

  return (
    <>
    <h2 className="page-subtitle">Admin Dashboard - Promotions</h2>
    <h3>Promotions</h3>
    <div className="text-center mt-5">
        <Link to="/promotion/new" className="link">
          <Button className="custom-button" size="lg">
            Add Promotion
          </Button>
        </Link>
      </div>
      <Container className="mt-5 px-5 container-border">
        <Row className="d-none d-md-flex align-items-center pt-4 pb-2">
          <Col className="text-center h5">
            <strong>Name</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Discount</strong>
          </Col>
          <Col className="text-center h5">
            <strong>Start Date</strong>
          </Col>
          <Col className="text-center h5">
            <strong>End Date</strong>
          </Col>
        </Row>
        {promotions.map((promotion) => (
          <PromotionListItem
            key={promotion.id}
            promotion={promotion}
          />
        ))}
      </Container>
    <div className="page-footer-buffer"></div>
    </>
  )
}