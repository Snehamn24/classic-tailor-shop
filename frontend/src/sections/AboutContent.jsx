export default function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-center">
      
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
        About Classic Tailor
      </h2>
      <p className="max-w-2xl mx-auto mb-12 text-gray-500">
        20 years of craftsmanship in N.G. Halli — where tradition meets perfect fit.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">

    
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <div className="text-4xl mb-3">🏬</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Legacy</h3>
          <p className="text-gray-600 text-sm">
            Serving customers in N.G. Halli for over <span className="font-semibold">20 years</span> with precision tailoring.
          </p>
        </div>

      
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <div className="text-4xl mb-3">🧵</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Nagaraj</h3>
          <p className="text-sm text-blue-600 mb-2">30+ Years Experience</p>
          <p className="text-gray-600 text-sm">
            Expert in <span className="font-medium">shirts & pants</span> with flawless finishing.
          </p>
        </div>

        {/* Smith Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <div className="text-4xl mb-3">✂️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Latha</h3>
          <p className="text-sm text-blue-600 mb-2">15+ Years Experience</p>
          <p className="text-gray-600 text-sm">
            Specialist in <span className="font-medium">shirt tailoring</span>
          </p>
        </div>

      </div>

      {/* Footer Line */}
      <p className="mt-10 text-gray-500 text-sm">
        Crafted with care. Designed for confidence.
      </p>
    </div>
  );
}
