import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PromotionListItem from "../components/PromotionListItem";
import { Container, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PageSubtitle from "../components/PageSubtitle";

export default function Promotions() {

  const [promotions, setPromotions] =useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const productNames =
    selectedPromotion ? selectedPromotion.products.map((product) => product.name).join(", ")
      : "No Products";

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

  const showPromotionModal = (breakpoint, promotion) => {
    setFullscreen(breakpoint);
    setSelectedPromotion(promotion);
    setShow(true);
  };

  const deletePromotionConfirm = () => {
    setConfirmDelete(true);
  }

  const deletePromotion = async () => {
    try {
      const promotionId = selectedPromotion.id;

      await axios.delete(`/api/promotion/${promotionId}`);

      setPromotions((prevPromotions) => 
      prevPromotions.filter((promotion) => promotion.id !== promotionId)
      );

      setShow(false);
      setConfirmDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <PageSubtitle subtitle="Admin - Promotions" />
    <h3>Promotions</h3>
    <Modal
        size="md"
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPromotion ? selectedPromotion.name : "Promotion Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPromotion && (
            <div className="m-4">
              <div className="d-flex">
                <div>
                  <p className="mb-2 h5">Promotion #: {selectedPromotion.id}</p>
                  <p className="mb-2 h5">Discount: {Math.round(selectedPromotion.percent_discount)}%</p>
                  <p className="mb-2 h5">
                    Start Date: {selectedPromotion.start_date ? selectedPromotion.start_date : "None"}
                  </p>
                  <p className="mb-2 h5">End Date: {selectedPromotion.end_date ? selectedPromotion.end_date : "None"}</p>
                  <p className="mb-2 h5">
                    Included products: 
                  </p>
                  <p>{productNames ? productNames : "No products included"}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedPromotion && (
            <>
            {confirmDelete && (
              <Alert variant="danger" className="me-5">
                Are you sure you want to delete this promotion?<br/>
                <Button variant="outline-danger" className="mt-3" onClick={deletePromotion}>Yes</Button>
                <Button variant="outline-danger" className="ms-3 mt-3" onClick={() => setConfirmDelete(false)}>No</Button>
                </Alert>
            )}
              <Link to={`/promotion/edit/${selectedPromotion.id}`} state={{ promotion: selectedPromotion }}>
                <Button className="custom-button">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </Link>
              <Button variant="danger" className="ms-3" onClick={deletePromotionConfirm}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
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
            onClick={(bp, promotion) =>
              showPromotionModal(bp, promotion)
            }
          />
        ))}
      </Container>
    <div className="page-footer-buffer"></div>
    </>
  )
}