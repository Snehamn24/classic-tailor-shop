import shirt_icon from "../assets/shirt_icon.png";
import pant_icon from "../assets/pant_icon.png";
import celebrate_icon from "../assets/celebrate.png";

export default function ServiceContent() {
  return (
    <div className="bg-blue-50 pt-32 pb-20">
      <div className="text-center max-w-6xl mx-auto px-4">
        
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 mb-14 max-w-xl mx-auto">
          Premium tailoring for everyday wear and special occasions.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card */}
          <ServiceCard
            icon={shirt_icon}
            title="Shirt Stitching"
            desc="Perfectly fitted custom shirts stitched with precision and care."
          />

          <ServiceCard
            icon={pant_icon}
            title="Pant Stitching"
            desc="Tailored trousers designed for comfort, style, and durability."
          />

          <ServiceCard
            icon={celebrate_icon}
            title="Wedding & Function Orders"
            desc="Bulk stitching for marriages, events, and special occasions."
          />

        </div>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="
      bg-white p-8 rounded-3xl shadow-md
      transition-all duration-300
      md:hover:shadow-2xl
      md:hover:-translate-y-2
      md:hover:scale-105
    ">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
          <img src={icon} className="w-20 h-20" alt={title} />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed text-center">
        {desc}
      </p>
    </div>
  );
}
