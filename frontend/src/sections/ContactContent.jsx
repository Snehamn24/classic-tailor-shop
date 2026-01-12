export default function ContactContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-center space-y-8">
      
      <h2 className="text-4xl font-bold text-blue-600 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-600 mb-8">
        Reach out for custom tailoring, orders, or any questions.
      </p>

    
      <div className="grid md:grid-cols-2 gap-8 text-left">
        
       
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☎️</span>
            <p className="text-gray-700 text-lg font-medium">+91 98765 43210</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✉️</span>
            <p className="text-gray-700 text-lg font-medium">classic.tailor@example.com</p>
          </div>
        </div>

       

      </div>
    </div>
  );
}
