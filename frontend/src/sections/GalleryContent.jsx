import "./GalleryContent.css";
import shop from "../assets/shop.jpeg";
import shirts from "../assets/shirts.jpeg";
import pant from "../assets/pant.jpeg";

export default function GalleryContent() {
  return (
    <section className="gallery-hero" id="gallery">
      <div className="gallery-slider">

        <div className="gallery-slide slide-1">
          <img src={shop} alt="Our Shop" />
          <div className="gallery-content">
            <h2>Our Tailoring Studio</h2>
            <p>Where craftsmanship meets tradition</p>
          </div>
        </div>

        <div className="gallery-slide slide-2">
          <img src={shirts} alt="Shirts Collection" />
          <div className="gallery-content">
            <h2>Shirt Collection</h2>
            <p>Perfect fits, premium fabrics</p>
          </div>
        </div>

        <div className="gallery-slide slide-3">
          <img src={pant} alt="Pant Collection" />
          <div className="gallery-content">
            <h2>Pant Collection</h2>
            <p>Designed for comfort and confidence</p>
          </div>
        </div>

      </div>
    </section>
  );
}
