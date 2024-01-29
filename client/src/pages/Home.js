import Button from "react-bootstrap/Button";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p>Crafting Adventures and Endless Creativity:</p>
          <p>Your Journey Awaits.</p>
        </div>
        <Button className="custom-button hero-button" size="lg">
          Start Exploring
        </Button>
      </section>
      <section>
        <h3>Inspired Collections</h3>
        <div className="home-collections">
          <div className="home-collection">
            <img src="/assets/images/home-sewing-thumbnail.webp" alt="" />
            <h4>Sewing Supplies</h4>
          </div>
          <div className="home-collection">
            <img src="/assets/images/home-diy-thumbnail.webp" alt="" />
            <h4>Curated DIY Kits</h4>
          </div>
          <div className="home-collection">
            <img src="/assets/images/home-painting-thumbnail.webp" alt="" />
            <h4>Painting Supplies</h4>
          </div>
        </div>
      </section>
      <section className="home-featured-special">
        <p>
          30% Off Select
          <br />
          Knitting Supplies
        </p>
      </section>
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
      <section className="home-kids-feature">
        <p>
          Check Out Our
          <br />
          Kid's Zone!
        </p>
      </section>
    </>
  );
}
