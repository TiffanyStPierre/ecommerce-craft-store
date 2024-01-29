import Button from "react-bootstrap/Button";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p>Crafting Adventures and Endless Creativity:</p>
          <p>Your Journey Awaits.</p>
        </div>
        <Link to="/products/all">
          <Button className="custom-button hero-button" size="lg">
            Start Exploring
          </Button>
        </Link>
      </section>
      <section>
        <h3>Inspired Collections</h3>
        <div className="home-collections">
          <Link to="/products/sewing" className="home-collection link">
            <img src="/assets/images/home-sewing-thumbnail.webp" alt="" />
            <h4>Sewing Supplies</h4>
          </Link>
          <Link to="/products/diy-kits" className="home-collection link">
            <img src="/assets/images/home-diy-thumbnail.webp" alt="" />
            <h4>Curated DIY Kits</h4>
          </Link>
          <Link to="/products/painting" className="home-collection link">
            <img src="/assets/images/home-painting-thumbnail.webp" alt="" />
            <h4>Painting Supplies</h4>
          </Link>
        </div>
      </section>
      <Link to="/products/knitting" className="link">
        <div className="home-featured-special">
          <p>
            30% Off Select
            <br />
            Knitting Supplies
          </p>
        </div>
      </Link>
      <section className="home-icons">
        <div className="home-icon-container">
          <FontAwesomeIcon icon={faTruck} size="3x" className="home-icon" />
          <h4>Free Shipping</h4>
        </div>
        <div className="home-icon-container">
          <FontAwesomeIcon icon={faLeaf} size="3x" className="home-icon" />
          <h4>Eco Friendly Packaging</h4>
        </div>
        <div className="home-icon-container">
          <FontAwesomeIcon icon={faGift} size="3x" className="home-icon" />
          <h4>Gift Cards Available</h4>
        </div>
      </section>
      <Link to="/products/kids" className="link">
      <section className="home-kids-feature">
        <p>
          Check Out Our
          <br />
          Kid's Zone!
        </p>
      </section>
      </Link>
    </>
  );
}
