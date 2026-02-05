import "./ContactContent.css";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export default function ContactContent() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Header */}
        <div className="contact-header">
          <span className="contact-subtitle">Get In Touch</span>
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-desc">
            We’d love to hear from you. Visit us or reach out anytime.
          </p>
        </div>

        {/* Content */}
        <div className="contact-grid">

          {/* LEFT */}
          <div className="contact-info">

            <div className="contact-item">
              <BsFillTelephoneForwardFill />
              <span>+91 77951 96984</span>
            </div>

            <div className="contact-item">
              <IoMdMail />
              <span>nagarajn2166@gmail.com</span>
            </div>

            <div className="contact-item">
              <FaLocationDot />
              <span>Classic Tailor, NG Halli Near to 8th mile, Gangodanahalli Main Road Bengaluru, Karnataka</span>
            </div>

            {/* Social */}
            <div className="contact-social">
              <a
                href="https://www.instagram.com/classic_mens_tailoring"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiInstagramFill />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&to=nagarajn2166@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0620642444496!2d77.49986227934558!3d13.031719700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cc29b41f08f%3A0x9b7565f24e6e3fc4!2sClassic%20Tailor!5e0!3m2!1sen!2sin!4v1768821047599!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Classic Tailor Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
