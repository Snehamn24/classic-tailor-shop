import shop from "../assets/shop.jpeg";
import shirts from "../assets/shirts.jpeg";
import pant from "../assets/pant.jpeg";

export default function GalleryContent() {
  return (
    <div className="text-center max-w-6xl mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
        Our Gallery
      </h2>
      <p className="text-gray-600 mb-14 max-w-xl mx-auto">
        Welcome to our gallery
        </p>
    
      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={shop}  // replace with your image path
            alt="Gallery 1"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={shirts}
            alt="Gallery 2"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={pant}
            alt="Gallery 3"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
