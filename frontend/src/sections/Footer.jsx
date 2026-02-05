import "./Footer.css";
import { Link as ScrollLink } from "react-scroll";
import { RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        {/* Column 1 – About */}
        <div className="footer-about">
          <h3>Classic Tailor</h3>
          <p>
            Serving premium tailoring for over 20 years. We specialize in
            custom-made shirts and pants with precision, comfort, and elegance.
          </p>
        </div>

        {/* Column 2 – Navigation (ALL SCROLLING TOGETHER) */}
        <div className="footer-nav">
          <h3>Quick Links</h3>

          <div className="footer-links">
            {[
              { label: "Home", to: "home" },
              { label: "Gallery", to: "gallery" },
              { label: "Contact Us", to: "contact" },
              { label: "Track Order", to: "trackorder" },
            ].map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="footer-link"
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>
        </div>

        {/* Column 3 – Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📞 +91 77951 96984</p>
          <p>✉️ nagarajn2166@gmail.com</p>
          <p>📍 NG Halli Nagasandra Post, Bengaluru, Karnataka</p>

          <div className="footer-social">
            <a
              href="https://www.instagram.com/classic_mens_tailoring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiInstagramFill />
            </a>
            <a href="mailto:nagarajn2166@gmail.com">
              <MdEmail />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Classic Tailor. All rights reserved.
      </div>
    </footer>
  );
}
