import shop_icon from "../assets/shop.png";
import man_icon from "../assets/man_icon.png";
import woman_icon from "../assets/woman_icon.png";

export default function ServiceContent() {
  return (
    <div className="bg-blue-50 py-20">
      <div className="text-center max-w-6xl mx-auto px-4">
        
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          About Us
        </h2>
        <p className="text-gray-600 mb-14 max-w-xl mx-auto">
          20 years of craftsmanship in N.G. Halli — where tradition meets perfect fit.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card */}
          <ServiceCard
            icon={shop_icon}
            title="Our Legacy"
            desc=" Serving customers in N.G. Halli for over 20 years with precision tailoring."
          />

          <ServiceCard
            icon={man_icon}
            title="Nagaraj N"
            desc=" Expert in shirts and pants stitching with flawless finishing and having 30+ years of experience."
          />

          <ServiceCard
            icon={woman_icon}
            title="Latha"
            desc=" Specialist in shirt tailoring and having 15+ years of experience"
          />

        </div>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
      
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
          <img src={icon} className="w-20 h-20" alt={title} />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
