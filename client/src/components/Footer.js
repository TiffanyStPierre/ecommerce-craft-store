import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-subsection">
        <p>FAQ</p>
        <p>Contact</p>
      </div>
      <div className="footer-subsection">
        <FontAwesomeIcon icon={faPalette} className="footer-icon" size="2x" />
        <p>Copyright 2023 - Craft Market Ltd</p>
      </div>
      <div className="footer-subsection">
        <p>About Us</p>
        <p>Careers</p>
      </div>
    </footer>
  );
}
