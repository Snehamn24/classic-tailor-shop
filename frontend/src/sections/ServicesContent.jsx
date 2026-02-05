import "./ServiceContent.css";
import sew from "../assets/seewing.jpeg";
import measure from "../assets/shirt1.webp";
import ready from "../assets/pant.webp";

export default function Services() {
  return (
    <section className="services-hero" id="service">
      
      <div className="slider">

        <div className="slide slide-1">
          <img src={sew} alt="Tailor Sewing" />
          <div className="slide-content">
            <h2>Tailor Sewing</h2>
            <p>Handcrafted stitching with unmatched precision</p>
          </div>
        </div>

        <div className="slide slide-2">
          <img src={measure} alt="Measurement" />
          <div className="slide-content">
            <h2>Perfect Measurement</h2>
            <p>Customized shirt for comfort and elegance</p>
          </div>
        </div>

        <div className="slide slide-3">
          <img src={ready} alt="Ready Made" />
          <div className="slide-content">
            <h2>Perfect Wear</h2>
            <p>Premium designs crafted for immediate perfection</p>
          </div>
        </div>

      </div>

    </section>
  );
}
