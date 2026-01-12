export default function ServiceContent() {
  return (
    <div className="text-center max-w-6xl mx-auto px-4">
      
      <h2 className="text-4xl font-bold text-blue-600 mb-3">
        Our Services
      </h2>
      <p className="text-gray-600 mb-10">
        Premium tailoring for everyday wear and special occasions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Shirt Stitching */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <div className="text-4xl mb-4">👔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Shirt Stitching
          </h3>
          <p className="text-gray-600 text-sm">
            Perfectly fitted custom shirts stitched with precision and care.
          </p>
        </div>

        {/* Pant Stitching */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <div className="text-4xl mb-4">👖</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Pant Stitching
          </h3>
          <p className="text-gray-600 text-sm">
            Tailored trousers designed for comfort, style, and durability.
          </p>
        </div>

        {/* Marriage & Function Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Wedding & Function Orders
          </h3>
          <p className="text-gray-600 text-sm">
            Bulk stitching for marriages, events, and special occasions.
          </p>
        </div>

      </div>
    </div>
  );
}
