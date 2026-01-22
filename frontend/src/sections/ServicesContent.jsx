import shirt_icon from "../assets/shirt_icon.png";
import pant_icon from "../assets/pant_icon.png";
import celebrate_icon from "../assets/celebrate.png";

export default function ServiceContent() {
  return (
    <section className="bg-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 mb-16 max-w-xl mx-auto">
          Premium tailoring for everyday wear and special occasions.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">

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
    </section>
  );
}

/* Reusable Card Component */
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="
      bg-white p-8 rounded-3xl shadow-md
      flex flex-col items-center text-center
      transition-all duration-300
      hover:shadow-2xl hover:-translate-y-2 hover:scale-105
    ">

      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
        <img src={icon} className="w-16 h-16" alt={title} />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
